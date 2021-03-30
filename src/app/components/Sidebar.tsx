import React from 'react'
import SushiLogo from 'assets/images/logo.png'

const Sidebar = () => {
  return (
    <>
      <div className="hidden w-28 overflow-y-auto md:block" style={{ background: '#141419' }}>
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src={SushiLogo} alt="" />
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            <a
              href="#"
              className="group text-white hover:bg-gray-700 hover:text-white w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
              aria-current="page"
            >
              {/* BarChart Icon */}
              <svg className="text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="mt-2">Portfolio</span>
            </a>
            <a
              href="#"
              className="bg-gray-700 text-white w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
              aria-current="page"
            >
              {/* Current: "text-white", Default: "text-indigo-300 group-hover:text-white" */}
              {/* Heroicon name: outline/photograph */}
              <svg
                className="text-white w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="mt-2">Swap</span>
            </a>
            <a
              href="#"
              className="group text-white hover:bg-gray-700 hover:text-white w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
              aria-current="page"
            >
              {/* Heroicon name: outline/user-group */}
              <svg className="text-white w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="mt-2">Lend</span>
            </a>
            <a
              href="#"
              className="group text-white hover:bg-gray-700 hover:text-white w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
              aria-current="page"
            >
              {/* Heroicon name: outline/collection */}
              <svg
                className="text-white h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="mt-2">Yield</span>
            </a>
            <a
              href="#"
              className="group text-white hover:bg-gray-700 hover:text-white w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
              aria-current="page"
            >
              {/* Heroicon name: outline/cog */}
              <svg
                className="text-white w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="mt-2">Invest</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
