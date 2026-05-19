import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/api'

function Profile() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const [data, setData] = useState(null)

    const getProfile = async () => {
        const response = await axios.get('auth/profile')
        // alert(response)
        // console.log(response.data.user)
        setData(response.data.user)

        if (response.status == 409) {
            toast.error(response.data.message);
            navigate("/login")
        }

        if (response.status == 201) {
            toast.success(response.data.message);
            // navigate("/profile")
        }
        // reset()
    }
    useEffect(()=>{
        getProfile()
    },[])



    return (
        <div className="h-screen p-4 relative flex items-center justify-center">
            <h2 className="text-2xl absolute top-5 left-6">welcome</h2>

            <form className="bg-transparent z-10 w-1/3 p-6 rounded shadow-xl shadow-zinc-500 flex flex-col gap-2" >
                <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>Your Details</h3>
                    <Link className='px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 duration-300 text-white' to="/edit-profile">Edit</Link>
                </div>
                <label htmlFor="name">Name:</label>
                <input id='name' type="email" className="bg-transparent border-b px-3 py-2 w-full  focus:outline-none border-zinc-300 focus:border-blue-500" placeholder="Enter your name" {...register("name")} disabled value={data?.name || ''} />
                <label htmlFor="email">Email:</label>
                <input id='email' type="email" className="bg-transparent border-b px-3 py-2 w-full border-zinc-300 focus:outline-none focus:border-blue-500" placeholder="Enter your email" {...register("email")} value={data?.email || ""} disabled />
                {/* <input type="file" className="bg-transparent border px-3 py-2 w-full border-zinc-300"  {...register("resumeUrl")} /> */}
                <label htmlFor="bio">Bio:</label>
                <textarea id='bio' type="text" className="bg-transparent border-b px-3 py-2 w-full border-zinc-300 focus:outline-none h-32 resize-none focus:border-blue-500" placeholder="About you" {...register("bio")} value={data?.profile?.bio || ""} disabled ></textarea>
                {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 duration-300">
                    save changes
                </button> */}

            </form>
        </div>

    )
}

export default Profile