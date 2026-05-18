import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import axios from './api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (data) => {

    try {

      const response = await axios.post(
        'auth/',
        data,
        {
          withCredentials: true
        }
      )

      if (response.status === 200 || response.status === 201) {

        toast.success(response.data.message)

        setTimeout(() => {
          navigate("/home")
        }, 1500)
      }

      reset()

    } catch (error) {

      if (error.response) {

        toast.error(error.response.data.message)

      } else {

        toast.error("Something went wrong")
      }
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white/10">

      <ToastContainer />

      <form
        className="bg-transparent p-6 rounded shadow-md flex flex-col gap-2 w-1/4"
        onSubmit={handleSubmit(onSubmit)}
      >

        <h2 className="text-2xl font-bold text-center">
          Welcome!
        </h2>

        <input
          type="text"
          className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500"
          placeholder="Enter your name"
          {...register("name", {
            required: "name is required"
          })}
        />

        <p className="text-red-500 text-sm">
          {errors.name?.message}
        </p>

        <input
          type="email"
          className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required"
          })}
        />

        <p className="text-red-500 text-sm">
          {errors.email?.message}
        </p>

        <input
          type="password"
          className="bg-transparent border-b px-3 py-2 border-white/30 focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required"
          })}
        />

        <p className="text-red-500 text-sm">
          {errors.password?.message}
        </p>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>

        <p>
          Don't have an account?
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Login