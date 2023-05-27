import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

export default function Home() {
  const images = [
    {
      url: 'https://picsum.photos/seed/1/200/300',
      author: 'Thomas',
    },
    {
      url: 'https://picsum.photos/seed/2/200/300',
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
                Merci d'avoir partagé cette journee exceptionnelle et merci d'avoir capture les moments inoubliable vous pouvez admirer les oeuvres et mettre les votre.
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-500 text-right">
                  Noemie & William MARECHAL
                </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-0 sm:py-1">
          <div className="mx-auto px-1 lg:px-1">
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {images.map((image) => (
                <article
                  key={image.url}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-4 pb-4 pt-80 sm:pt-48 lg:pt-80"
                >
                  <img src={image.url} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <h3 className="mt-6 text-sm font-semibold leading-3 text-white text-right">
                    <span>
                      <span className="absolute inset-0" />
                      par {image.author}
                    </span>
                  </h3>
                </article>
              ))}
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
          </div>
        </div>
      </main>
    </div>
  )
}
