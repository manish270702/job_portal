import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/api'
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {

  const [data, setdata] = useState([])
  const [page, setpage] = useState(1)
  const [totalpages, setTotalpages] = useState(1)

  const loadingRef = useRef(false)

  const fetchData = async () => {

    if (loadingRef.current) return
    
    loadingRef.current = true

    try {

      const response = await axios.get('/jobs', {
        params: {
          page,
          limit: 10
        }
      })

      setdata(prev => [...prev, ...response.data.data])

      setTotalpages(response.data.pagination.pages)
      
      
    } catch (error) {
      
      console.log(error)
      
    } finally {
      
      setpage(prev => prev + 1)
      loadingRef.current = false
    }
  }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (

    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={page <= totalpages}
      loader={<h4>Loading...</h4>}
      className='grid grid-cols-2 gap-5 px-8 py-8'
    >

      {data.map((item) => (
        <div
          key={item._id}
          className="border rounded-md p-3"
        >
          <h1 className="text-xl font-bold">
            {item.title}
          </h1>

          <p>{item.company}</p>
          <p>{item.location}</p>
          <p>{item.salary}</p>
          <p>{item.jobtype}</p>

        </div>
      ))}

    </InfiniteScroll>
  )
}

export default Home