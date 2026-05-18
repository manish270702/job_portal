import React, { useEffect, useRef, useState } from 'react'
import axios from '../api/api'
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
const Navigate = useNavigate()


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
          limit: 20
        }
      })

      setdata(prev => [...prev, ...response.data.data])

      setTotalpages(response.data.pagination.pages)
      
      
    } catch (error) {

      if (error.response && error.response.status === 401) {
        toast.error("Please login to continue");
        Navigate('/login')
      }
      console.log(error)
      
    } finally {
      
      setpage(prev => prev + 1)
      loadingRef.current = false
    }
  }


  return (

    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={page <= totalpages}
      loader={<h4>Loading...</h4>}
      className='grid grid-cols-5 gap-5 px-8 py-4'
    >

      {data.map((item) => (
        <div
          key={item._id}
          className="border rounded-md p-3 h-52"
        >
          <h1 className="text-xl font-bold">
            {item.title}
          </h1>

          <p>{item.company}</p>
          <p>{item.location}</p>
          <p>{item.salary}</p>
          <p>{item.jobtype}</p>
          <p>hello</p>
          <p>hello</p>
        </div>
      ))}

    </InfiniteScroll>
  )
}

export default Home