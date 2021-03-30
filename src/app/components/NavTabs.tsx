import React from 'react'
import { GridListSwitcher } from '../components'

const Tabs = () => {
  return (
    <>
      <div className="mt-3 sm:mt-2">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option selected>Your Instruments</option>
            <option>Onsen</option>
            <option>Original</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center border-b border-gray-200">
            <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
              {/* Current: "border-gray-500 text-gray-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
              <a
                href="#"
                aria-current="page"
                className="border-gray-900 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Your Instruments
              </a>
              <a
                href="#"
                aria-current="false"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Onsen
              </a>
              <a
                href="#"
                aria-current="false"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Original
              </a>
              <a
                href="#"
                aria-current="false"
                className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              >
                Previous
              </a>
            </nav>
            <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
              <GridListSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tabs
