"use client"

import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { useS3Upload } from "next-s3-upload";

export default function Home() {
  const {
    files: uploadingFiles,
    openFileDialog,
    uploadToS3,
  } = useS3Upload()

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


  const images = [
    {
      url: 'https://telemediabroadcasting.com/wp-content/uploads/2016/03/WhiteBackground.jpg',
      author: 'Thomas',
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Black_colour.jpg',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/1/300/200',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/2/300/200',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/1/300/200',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/2/200/300',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/1/200/300',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/2/300/200',
      author: 'Thomas',
    }
  ]

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
            {images.map((image) => (
              <div className="md:col-span-1">
                <div className="relative">
                  <img src={image.url} className="w-full h-auto"/>
                  <span className="absolute bottom-0 right-0 bg-white text-black p-2 text-sm font-semibold rounded-tl-md">
                    <p className='inline-block'>par Thomas</p>
                    <ArrowDownIcon
                      className="inline-block h-5 w-5 text-black cursor-pointer"
                      title='Télécharger'
                      onClick={() => downloadFile(image.url)}
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
          title="Ajouter vos photos"
          className="cursor-pointer fixed z-90 bottom-14 right-2 bg-blue-600 py-2 px-1 text-lg rounded-full drop-shadow-lg justify-center items-center text-white hover:bg-blue-700 hover:drop-shadow-2xl"
        >
          <input
            type="file"
            multiple
            className="hidden"
            onChange={event => handleFileChange(Array.from(event.target.files!))}
          />
          Ajouter vos photos
        </label>
      </main>
    </div>
  )
}
