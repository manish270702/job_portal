import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from '../api/api'

function EditProfile() {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const getProfile = async () => {

        const response = await axios.get('auth/profile')

        const user = response.data.user
        // console.log(user)

        // set default values
        setValue("name", user.name)
        setValue("bio", user.profile.bio)
    }

    useEffect(() => {
        getProfile()
    }, [])

    const onSubmit = async (data) => {

        
        const formData = new FormData()
        
        formData.append("name", data.name)
        formData.append("bio", data.bio)
        
        // file
        formData.append("resumeUrl", data.resumeUrl[0])

        const response = await axios.patch(
            'auth/updateprofile',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        console.log(response)
    }

    return (
        <div className="h-screen p-4 relative flex items-center justify-center">

            <form
                className="bg-transparent z-10 w-1/3 p-6 rounded shadow-xl shadow-zinc-500 flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >

                <h3 className='text-xl font-bold'>
                    Edit Your Details
                </h3>

                <label>Name:</label>

                <input
                    type="text"
                    className="bg-transparent border-b px-3 py-2 w-full"
                    placeholder="Enter your name"
                    {...register("name")}
                    
                />

                <label>Resume:</label>

                <input
                    type="file"
                    className="bg-transparent border px-3 py-2 w-full"
                    {...register("resumeUrl")}
                />

                <label>Bio:</label>

                <textarea
                    className="bg-transparent border-b px-3 py-2 w-full h-32 resize-none"
                    placeholder="About you"
                    {...register("bio")}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                    save changes
                </button>

            </form>
        </div>
    )
}

export default EditProfile