"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/')
  }
  return (
    <div className='sticky top-0'>
      <nav className="min-w-full h-14 bg-gray-800 flex items-center justify-between px-5">
        <span onClick={handleClick} className="text-2xl font-bold cursor-pointer">AI News Finder</span>
        <div className="w-36 space-x-4">
          <span className="text-lg cursor-pointer hover:underline">About</span>
          <button className="py-1.5 px-2 bg-black hover:bg-gray-700 rounded-2xl text-lg cursor-pointer">Sign In</button>
        </div>
      </nav>
    </div>
  )
}

export default navbar
