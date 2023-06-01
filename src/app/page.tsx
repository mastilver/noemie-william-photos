"use client"

import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { useS3Upload } from "next-s3-upload";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ky from 'ky'

export default function Home() {
  const {
    files: uploadingFiles,
    openFileDialog,
    uploadToS3,
  } = useS3Upload()

  const {
    contents,
  } = usePages()

  async function handleFileChange(files: File[]) {
    for(const file of files) {
      await uploadToS3(file);
    }
  }

  function downloadFile(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
  
    link.click();
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <main>
        <div className="relative">
          <img src="/hero.jpg" />
          
          <div className="absolute text-2xl text-blue-300 top-5 left-5 px-10 sm:pl-96 sm:pr-40">
            <div className="text-center">
                <p className="mt-6 text-lg leading-8 text-gray-600">
                Merci d&apos;avoir partagé cette journee exceptionnelle et merci d&apos;avoir capture les moments inoubliable vous pouvez admirer les oeuvres et mettre les votre.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-500 text-right">
                  Noemie & William MARECHAL
                </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-0 sm:py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1 lg:px-8">
            {contents.map((content) => (
              <div className="md:col-span-1" key={content.url}>
                <div className="relative">
                  <img src={content.url} className="w-full h-auto"/>
                  <span className="absolute bottom-0 right-0 bg-white text-black p-2 text-sm font-semibold rounded-tl-md">
                    <p className='inline-block'>par Thomas</p>
                    <ArrowDownIcon
                      className="inline-block h-5 w-5 text-black cursor-pointer"
                      title='Télécharger'
                      onClick={() => downloadFile(content.url)}
                    />
                  </span>
                </div>
              </div>
            ))}         
          </div>
        </div>

        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1 py-3">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Précédent
            </a>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Suivant
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
          </div>
        </nav>

        <label
          title="Ajoutez vos photos/videos"
          className="cursor-pointer fixed z-90 bottom-14 right-2 bg-blue-600 py-2 px-1 text-lg rounded-full drop-shadow-lg justify-center items-center text-white hover:bg-blue-700 hover:drop-shadow-2xl"
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={event => handleFileChange(Array.from(event.target.files!))}
          />
          Ajoutez vos photos/vidoes
        </label>
      </main>
    </div>
  )
}

type Content = {
  url: string,
  author: string,
  type: 'image' | 'video',
}

type Page = {
  nextContinuationToken: string | null,
  contents: Content[]
}

function usePages(): {
  contents: Content[],
  currentPage: number,
  reset(): Promise<void>,
  previousPageDisabled: boolean,
  goToPreviousPage(): Promise<void>,
  nextPageDisabled: boolean,
  goToNextPage(): Promise<void>,
} {
  const [currentPage, setCurrentPage] = useState(0)

  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    queryMoreFiles()
  }, [])

  async function queryMoreFiles() {
    const currentArrayLength = pages.length

    const data = await ky.get(`/api/contents?nextContinuationToken=${pages[currentArrayLength - 1]?.nextContinuationToken}`).json<Page>()

    setPages(arr => {
      // NOTE: use previously queried length to prevent race conditions
      arr[currentArrayLength] = data
      return arr
    })
  }

  async function goToPreviousPage() {

  }

  async function goToNextPage() {

  }

  async function reset() {
    setCurrentPage(0)
    setPages([])
    await queryMoreFiles()
  }

  return {
    contents: pages[currentPage]?.contents ?? [],
    reset,
    currentPage,
    previousPageDisabled: currentPage === 0,
    goToPreviousPage,
    nextPageDisabled: pages[currentPage]?.nextContinuationToken != null,
    goToNextPage,
  }
}