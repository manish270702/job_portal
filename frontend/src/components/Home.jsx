import React from 'react'
import axios from '../api/api'
import { useState } from 'react'
import { useEffect } from 'react'

function Home() {

  const [data, setdata] = useState([])
  const [page, setpage] = useState(0)

  const fetchData = async () => {
    setpage(prev=>prev+1)
    const response = await axios.get('/jobs',{
      params: {
        page,
        limit:20
      }
    })
    console.log(response.data.data)
    setdata([...data, ...response.data.data])
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // fetchData()
  }, [page])

  return (
    <>
      <div className='grid grid-cols-5 gap-5 px-8'>
        {data.map((item) => {
          return <div key={item._id} className="border rounded-md p-3">
            <h1 className="text-xl font-bold">{item.title}</h1>
            <p>{item.company}</p>
            <p>{item.location}</p>
            <p>{item.salary}</p>
            <p>{item.jobtype}</p>
          </div>
        })}
      </div>
      <button onClick={fetchData} className="bg-blue-500 mt-5 text-white px-4 py-2 rounded-md">Fetch Jobs</button>
    </>
  )
}

export default Home