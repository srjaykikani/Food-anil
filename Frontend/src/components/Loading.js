import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-t-4 rounded-full animate-spin"></div>
        <div className="mt-4 text-lg font-semibold text-gray-600">
          Loading...
        </div>
      </div>
  )
}

export default Loading
