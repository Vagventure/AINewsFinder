"use client"
import React from 'react'
import Navbar from '@/components/navbar'
import { useState, useEffect } from 'react'

const page = () => {
    const [news, setNews] = useState(null)
    const [AiSummarised, setSummarised] = useState('')
    const [ai, setAi] = useState(false)
    const [load, setLoad] = useState(false)


    useEffect(() => {
        const data = localStorage.getItem('newsData')
        if (!data) {
            console.log("Data not recieved")
            return;
        }
        setNews(JSON.parse(data))

    }, [])


    const handleClick = async () => {
        setLoad(true)
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "headline": news.title,
                "date": news.publishedAt,
                "description": news.description,
                "content": news.content,
                "sourceUrl": news.sourceUrl
            })
        })

        const data = await res.text()
        console.log(data)
        setSummarised(data)
        setAi(true)
        setLoad(false)
    }

    return (
        <div className='flex flex-col justify-center'>
            <Navbar />
            {load ? (<span className='mx-auto mt-4 text-2xl'>AI Summarising...</span>) : (<span className='mx-auto mt-4 text-2xl'>Article</span>)}

            {news && !ai ? (
                <>
                    <div className='w-1/2 h-fit flex mx-auto p-7'>

                        <div className='w-full h-full bg-gray-800 outline-4 p-1'>
                            <div className='box1 w-full h-1/3 flex gap-2 p-1 items-center'>
                                <div className='w-1/3 h-[140px]'>
                                    <img className='w-full h-full object-contain' src={news?.image} />
                                </div>
                                <div className='text-2xl w-2/3 space-y-2'>
                                    {news?.title}
                                    <div className='text-lg italic'>{news.publishedAt}</div>
                                </div>
                            </div>
                            <div className='w-full border-1 border-white'></div>

                            {load ? (<div className='box2 w-full h-52 p-3 flex items-center justify-center relative bg-gray-800'>Processing...</div>) : (<div className='box2 w-full h-2/3 p-3 relative bg-gray-800'>
                                <p className='w-full text-lg'>{news.description}</p>
                                <br></br>
                                <p className='w-full text-lg'>{news.content.split('...')[0]}</p>
                                <br></br>
                                <a href={news.sourceUrl} className='italic hover:underline' target='_blank'>Read more about here...</a>
                            </div>)}

                        </div>

                    </div>
                    <button onClick={handleClick} className='p-2 rounded-2xl cursor-pointer mx-[45%] bg-white text-black'>Get AI Summary</button>

                </>
            ) : (
                " "
            )}


            {AiSummarised && ai ? (
                <>
                    <div className='w-1/2 min-h-[90vh] flex mx-auto items-center'>
                        <div className='w-full h-fit bg-gray-800 outline-4 '>
                            <div className='box1 w-full h-1/3 flex gap-2 p-1 items-center'>
                                <div className='w-1/3 h-[140px]'>
                                    <img className='w-full h-full object-contain' src={news?.image} />
                                </div>
                                <div className='text-2xl w-2/3 space-y-2'>
                                    {news?.title}
                                    <div className='text-lg italic'>{news.publishedAt}</div>
                                </div>
                            </div>
                            <div className='w-full border-1 border-white'></div>
                            <div className='box2 w-full h-2/3 p-3 bg-gray-800 whitespace-pre-line'>
                                <p className='text-lg'>{AiSummarised}</p>
                            </div>


                        </div>


                    </div>

                </>
            ) : (
                " "
            )}

        </div>
    )
}

export default page
