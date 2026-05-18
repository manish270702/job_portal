import React from 'react'
import axios from '../api/api'
import { useState } from 'react'
import { useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {

  const [data, setdata] = useState([])
  const [page, setpage] = useState(1)
  const [totalpages, setTotalpages] = useState(0)

  const fetchData = async () => {
    setpage(prev => prev + 1)
    const response = await axios.get('/jobs', {
      params: {
        page,
        limit: 20
      }
    })
    setdata([...data, ...response.data.data])

    setTotalpages(response.data.pagination.pages)
  }
  const checkhasmore = () => {
    if (totalpages < page) {
      return false
    }
    return true
    console.log(totalpages);
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
        <InfiniteScroll
          className='grid grid-cols-5 gap-5 px-8'
          dataLength={data.length}
          next={fetchData}
          hasMore={checkhasmore()}
          loader={checkhasmore() ? <h4>Loading...</h4>:null}
          scrollableTarget="scrollableDiv"
        >
          {data.map((item) => {
            return <div key={item._id} className="border rounded-md p-3">
              <h1 className="text-xl font-bold">{item.title}</h1>
              <p>{item.company}</p>
              <p>{item.location}</p>
              <p>{item.salary}</p>
              <p>{item.jobtype}</p>
            </div>
          })}
        </InfiniteScroll>
  )
}

export default Home