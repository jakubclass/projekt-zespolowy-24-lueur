import React, { useState } from 'react'
import logo from '../../../../public/logo.png'
import { MdOutlineMailOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { IoPencil } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import { useMutation } from "@tanstack/react-query"
import toast from 'react-hot-toast';


const SignUpPage = () => {

    const { mutate, isLoading, isError, isPending, error } = useMutation({
        mutationFn: async ({email, username, fullname, password}) => {
            try{
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email, username, fullname, password})
                })

                
                const data = await res.json()

                if(data.error) throw new Error(data.error)
                console.log(data)
                toast.success("Account created successfully")

                return data

            }catch(e){
                toast.error(e.message)
                console.log(e.message)
            }
        }
    })
    

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullname: "",
        password: ""
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        if(formData.email && formData.username && formData.fullname && formData.password){
            mutate(formData)
        }else{
            toast.error("Please fill in all fields")
        }
    }

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    return (
        <div className='w-[100vw] bg-black min-h-[100vh] flex flex-col items-center justify-center'>
            <img src={logo} alt='logo' className='w-[300px]'/>
            <h2 className='tracking-widest text-3xl mb-10'>Let us get started</h2>
            <form onSubmit={handleSubmit} className='w-[350px]'>
                <label className="input input-bordered w-full flex items-center gap-2 mb-4">
                    <MdOutlineMailOutline />
                    <input name='email' value={formData.email} onChange={handleInputChange} type="email" className="w-full" placeholder="Email" />
                </label>
                <label className="input input-bordered w-full flex items-center gap-2 mb-4">
                    <GoPerson />
                    <input name='username' value={formData.username} onChange={handleInputChange} type="text" className="w-full" placeholder="Username" />
                </label>
                <label className="input input-bordered w-full flex items-center gap-2 mb-4">
                    <IoPencil />
                    <input name='fullname' value={formData.fullname} onChange={handleInputChange} type="text" className="w-full" placeholder="Full Name" />
                </label>
                <label className="input input-bordered w-full flex items-center gap-2 mb-4">
                    <MdOutlinePassword />
                    <input name='password' value={formData.password} onChange={handleInputChange} type="password" className="w-full" placeholder="Password" />
                </label>
                <button disabled={isPending} className="btn w-full rounded-full">
                    {
                        isPending ? 
                        <span className="loading loading-ring loading-lg"></span>
                        :
                        <span>Sign up</span>
                    }
                </button>
            </form>
            <h4 className='mt-6 text-slate-400 mb-2'>Already have an account?</h4>
            <NavLink to={'/login'} className="btn btn-primary rounded-full w-[350px]">Log in</NavLink>
        </div>
    )
}

export default SignUpPage