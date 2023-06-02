"use client"

import { ArrowLongLeftIcon, ArrowLongRightIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { useS3Upload } from "next-s3-upload";

import usePages from './hooks/usePages';
import useAuth from './hooks/useAuth';
import { useState } from 'react';

export default function Home() {
  const {
    isLoggedIn,
    login,
  } = useAuth()

  if (!isLoggedIn) {
    // TODO: login screen
    return (
      <LogInPage login={login}/>
    )
  }

  return (
    <MainPage />
  )
}


function LogInPage({
  login,
}: {
  login(username: string, password: string): any,
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={event => {
          event.preventDefault()
          handleSubmit()
        }}>
          <div>
            <label htmlFor="username" className="block text-base font-medium leading-3 text-gray-900">
              Nom <span className="text-sm">(utilisé seulement pour poster une photo)</span>
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mot de passe partagé
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function MainPage() {
  const {
    files: uploadingFiles,
    openFileDialog,
    uploadToS3,
  } = useS3Upload()

  const {
    contents,
    previousPageDisabled,
    goToPreviousPage,
    nextPageDisabled,
    goToNextPage,
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
                    <p className='inline-block'>par {content.author}</p>
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
              onClick={goToPreviousPage}
              className="cursor-pointer inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Précédent
            </a>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              onClick={goToNextPage}
              className="cursor-pointer inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
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