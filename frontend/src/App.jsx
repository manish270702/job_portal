import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import axios from './api/api'
function App() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const response = await axios.post('/auth/', data)
    alert(response.data.message)
    reset()
  }


  return (
    <div className="w-screen h-screen flex items-center bg-white/10  justify-center">
      <form className="bg-transparent z-10 bg-blur-lg p-6 rounded shadow-md  flex flex-col gap-4 w-1/4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center">Welcome!</h2>
        <input type="text" className="bg-transparent border-b  px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter your name" {...register("name", { required: true })} />
        {errors.name && <span className='text-red-500 text-sm'>This field is required</span>}
        <input type="email" className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter your email" {...register("email", { required: true })} />
        {errors.email && <span className='text-red-500 text-sm'>This field is required</span>}
        <input type="password" className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500" placeholder="Enter your password" {...register("password", { required: true })} />
        {errors.password && <span className='text-red-500 text-sm'>This field is required</span>}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
        <p>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
      </form>
    </div>
  )
}

export default App