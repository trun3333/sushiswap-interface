import React from 'react'

const Gallery = ({ items }: any) => {
  return (
    <>
      <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Recently viewed
        </h2>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {/* Current: "ring-2 ring-offset-2 ring-indigo-500", Default: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500" */}
          <li className="relative">
            <div className="ring-2 ring-offset-2 ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80"
                alt=""
                className="object-cover pointer-events-none"
              />
              <button type="button" className="absolute inset-0">
                <span className="sr-only">View details for IMG_4985.HEIC</span>
              </button>
            </div>
            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">IMG_4985.HEIC</p>
            <p className="block text-sm font-medium text-gray-500 pointer-events-none">3.9 MB</p>
          </li>
          {items &&
            items.length > 0 &&
            items.map((item: any) => {
              return (
                <li className="relative" key={item.address}>
                  <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixqx=Mi0y9Fqzxq&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80"
                      alt=""
                      className="group-hover:opacity-75 object-cover pointer-events-none"
                    />
                    <button type="button" className="absolute inset-0">
                      <span className="sr-only">View details for IMG_5214.HEIC</span>
                    </button>
                  </div>
                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                    IMG_5214.HEIC
                  </p>
                  <p className="block text-sm font-medium text-gray-500 pointer-events-none">4 MB</p>
                </li>
              )
            })}
        </ul>
      </section>
    </>
  )
}

export default Gallery
