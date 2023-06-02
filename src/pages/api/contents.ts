import { GetObjectCommand, S3, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextApiRequest, NextApiResponse } from 'next'

type Content = {
  url: string,
  author: string,
  type: 'image' | 'video',
}

type Page = {
  nextContinuationToken: string | null,
  contents: Content[]
}

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.S3_KEY!,
    secretAccessKey: process.env.S3_SECRET!
  },
  region: process.env.S3_REGION,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<Page>) {
  if (req.cookies.password !== process.env.PASSWORD) {
    return res.status(403)
  }

  const continuationToken = req.query.nextContinuationToken
  if (typeof continuationToken !== 'string') {
    throw new Error('nextContinuationToken not a string')
  }

  const objects = await s3.listObjectsV2({
    Bucket: process.env.S3_BUCKET,
    MaxKeys: 20,
    ContinuationToken: continuationToken ? decodeURIComponent(continuationToken) : undefined,
  })

  const page: Page =  {
    nextContinuationToken: objects.IsTruncated ? encodeURIComponent(objects.NextContinuationToken!) : null,
    contents: await Promise.all((objects.Contents ?? []).map(async c => {
      const url = await getSignedUrl(s3, new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: c.Key,        
      }), {
        expiresIn: 3600,
      })

      return {
        url: url,
        author: getAuthor(c.Key!),
        type: 'image',
      }
    })),
  }

  res.status(200).json(page);
}

function getAuthor(url: string): string {
  const [,author] = url.split('/')

  return author
}