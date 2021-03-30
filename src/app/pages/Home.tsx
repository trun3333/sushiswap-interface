import React from 'react'
import { Sidebar, Header, Gallery, NavTabs, GridListSwitcher, ActionBar } from '../components'

const Home = () => {
  return (
    <>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Narrow sidebar */}
        <Sidebar />
        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">Yield Instruments</h1>
                  <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
                    <GridListSwitcher />
                  </div>
                </div>
                {/* Tabs */}
                <NavTabs />
                {/* Gallery */}
                <Gallery items={[1, 2, 3, 4, 5]} />
              </div>
            </main>
            {/* Details sidebar */}
            <ActionBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
