import React, { useState } from 'react'
import logo from '../../../../public/logo.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { IoPencil } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';


const LogInPage = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending} = useMutation({
        mutationFn: async ({username, password}) => {
            try{
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username, password})
                })

                // if(!res.ok) throw new Error(res.error)
                
                const data = await res.json()

                if(data.error) throw new Error(data.error)
                console.log(data)
                queryClient.invalidateQueries({queryKey: ['authUser']})
                toast.success("Logged in successfully")

                return data
            }catch(e){  
                toast.error(e.message)
                console.log(e.message)
            }
        }
    })

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        mutate(formData)
    }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

  return (
    <div className='w-[100vw] bg-black min-h-[100vh] flex flex-col items-center justify-center'>
        <img src={logo} alt='logo' className='w-[300px]'/>
        {/* <h2 className='tracking-widest text-3xl mb-10'>Hello, Welcome back</h2> */}
        <form onSubmit={handleSubmit} className='w-[350px]'>

            <label className="input input-bordered w-full flex items-center gap-2 mb-4">
                <GoPerson />
                <input name='username' value={formData.username} onChange={handleInputChange} type="text" className="w-full" placeholder="Username" />
            </label>

            <label className="input input-bordered w-full flex items-center gap-2 mb-4">
                <MdOutlinePassword />
                <input name='password' value={formData.password} onChange={handleInputChange} type="password" className="w-full" placeholder="Password" />
            </label>
            <button disabled={isPending} className="btn w-full rounded-full">{
                isPending ?
                <span className="loading loading-spinner loading-lg"></span>
                :
                <span>Log in</span>

                }</button>
        </form>
        <h4 className='mt-6 text-slate-400 mb-2'>Do not have an account?</h4>
        <NavLink to="/signup" className="btn btn-primary rounded-full w-[350px]">Create it</NavLink>
    </div>
  )
}

export default LogInPage