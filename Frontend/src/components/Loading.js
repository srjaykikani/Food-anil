import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
    </div>
  )
}

export default Loading

