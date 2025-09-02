"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState('')
  const [news, setNews] = useState([])
  const [aicall, setAicall] = useState('')

  const handleClick = async () => {
    setNews([]);
    const res = await fetch('/api/newsApi', {
      method: 'POST',
      headers: {
        "Content-Type": "appliction/json"
      },
      body: JSON.stringify({
        "query": query
      })
    })

    const data = await res.json();
    console.log("Data request sent: ", query)
    setNews(data)
  }

  return (
    <div className="min-w-[97vw] min-h-auto bg-gray-700">
      <nav className="min-w-full h-14 bg-gray-800 flex items-center justify-between px-5 sticky top-0">
        <span className="text-2xl font-bold cursor-pointer">AI News Finder</span>
        <div className="w-36 space-x-4">
          <span className="text-lg cursor-pointer hover:underline">About</span>
          <button className="py-1.5 px-2 bg-black hover:bg-gray-700 rounded-2xl text-lg cursor-pointer">Sign In</button>
        </div>
      </nav>
      <div className="min-w-[97vw] min-h-[95vh] flex justify-center">
      
        {news && <div className="News-section w-full min-h-screen p-2 mb-24 space-y-5">
          {news.map(e=>{
            return <div className="News w-1/2 mx-auto mt-2 p-2 cursor-pointer max-h-fit outline-4 outline-white bg-gray-800 flex items-center gap-2">
            <div className="Image w-[30%] h-[170px]">
              <img className="w-full h-full object-cover" src={e.image} />
            </div>
            <div className="w-[70%] h-full flex flex-col justify-evenly">
              <span className="text-2xl font-bold">{e.title}</span>
              <div className="w-full h-[39px] text-[12px] overflow-hidden text-[#a1a0a0]">{e.description}</div>
              <span className="text-sm font-medium">{e.publishedAt.split('T')[0]}</span>
            </div>
          </div>
          })}
          
        </div>}
        <div className="fixed w-full bottom-4">
          <div className="search-box mx-auto bg-gray-800 w-1/2 h-14 rounded-2xl flex items-center justify-between p-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input className="w-[91%] outline-none" type="text" placeholder="Enter your headline here" value={query} onChange={(e) => setQuery(e.target.value)}></input>

            <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10 cursor-pointer">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
            </svg>

          </div>
        </div>
      </div>
    </div>
  );
}
