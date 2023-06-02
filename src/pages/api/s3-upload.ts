import { APIRoute } from "next-s3-upload";


export default APIRoute.configure({
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    async key(req, filename) {
        if (req.cookies.password !== process.env.PASSWORD || !req.cookies.username) {
            throw new Error('Not logged in')
        }

        return `${Number.MAX_SAFE_INTEGER - new Date().getTime()}/${req.cookies.username}/${filename}`
    }
})