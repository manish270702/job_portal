import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import axios from '../api/api'

function Home() {
  const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async(data) => {
      const response = await axios.post('/jobs', data)
      // alert(response.data.message)
      reset()
    }
    
  
  
    return (
      <div className="w-screen h-screen flex items-center bg-white/10  justify-center">
        <form className="bg-transparent z-10 bg-blur-lg p-6 rounded shadow-md  flex flex-col gap-4 w-1/4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center">Welcome!</h2>
          <input type="text" className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter job title" {...register("title")} />
          <input type="text" className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter job location" {...register("location")} />
          <input type="text" className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter company name" {...register("company")} />
          <select name="jobType" id="jobtype" {...register("jobtype")} className='px-
          4 py-2 focus:outline-none focus:border-blue-500 bg-transparent border-b border-white/30'>
            <option className='px-
          4 py-2' value="full-time">Full-time</option>
            <option  className='px-
          4 py-2' value="part-time">Part-time</option>
            <option className='px-
          4 py-2' value="contract">Contract</option>
          </select>
          <input type="text" className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter salary range" {...register("salary")} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Job
          </button>
        </form>
      </div>
    )
}

export default Home