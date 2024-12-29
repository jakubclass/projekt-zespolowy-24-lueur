import { CiVoicemail } from "react-icons/ci";
import { IoGlobeOutline } from "react-icons/io5";
import { MdOutlineFormatQuote } from "react-icons/md";
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { CiBag1 } from "react-icons/ci";

const AboutMe = () => {

    const { data:userProfile, isLoading } = useQuery({queryKey: ['userProfile']})
    if(isLoading){
        return <div className="w-full h-[200px] skeleton mt-8"></div>
    }

  return (
    <div className='bg-[rgb(28,28,37)] p-6 montserrat-my rounded-xl mt-8'>
        <p className='text-slate-300'>About me</p>
        <div className="divider"></div>
        {/* BIO */}
        <div className='text-sm text-slate-400 w-[70%]'>
            <MdOutlineFormatQuote className="inline mr-2"/>
            {!userProfile?.bio ? "No bio yet" : userProfile.bio}
            <MdOutlineFormatQuote className="inline ml-2 rotate-180"/>
        </div>
        <div className="divider"></div>

        {/* LOCATION */}
        <div className="flex items-center gap-4 text-slate-400">
            <CiVoicemail size={25}/>
            <p>{userProfile.email}</p>
        </div>

        {/* LINK */}
        <div className="flex items-center gap-4 text-slate-400 mt-4">
            <IoGlobeOutline size={25}/>
            <Link to={userProfile?.link || "/"} target="_blank">{userProfile?.link || "No link"}</Link>
        </div>

        {/* CREATED AT */}
        <div className="flex items-center gap-4 text-slate-400 mt-4">
            <CiCalendar size={25}/>
            <p>Joined - {new Date(userProfile.createdAt).toLocaleString('en-EN', {dateStyle: "short"})}</p>
        </div>  

        {/* WORKING AT */}
        <div className="flex items-center gap-4 text-slate-400 mt-4">
            <CiBag1 size={25}/>
            <p>Working at Sebo Studio</p>
        </div>  
    </div>
  )
}

export default AboutMe