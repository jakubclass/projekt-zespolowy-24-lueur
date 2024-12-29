import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { LuShare2 } from "react-icons/lu";
import { BsTextIndentLeft } from "react-icons/bs";

const SingleNotificationCard = ({from, type}) => {
    const [avatarLoading, setAvatarLoading] = useState(true)
    const navigate = useNavigate()
    return (
        <div className='h-[400px] bg-[rgb(28,28,37)] rounded-xl flex items-center flex-col justify-center montserrat-my hover:outline-blue-500 outline outline-2 transition-all duration-150 outline-[rgb(18,19,26)] outline-offset-[5px]'>
            <div onClick={() => navigate(`/profile/${from.username}`)} className="avatar cursor-pointer">
                <div className="w-36 rounded-full bg-[rgb(40,41,50)]">
                    <img onLoad={() => setAvatarLoading(false)} src={from.profileImg} className={`${avatarLoading ? "opacity-0" : "opacity-100"}`}/>
                </div>
            </div>
            <p onClick={() => navigate(`/profile/${from.username}`)} className='mt-8 text-lg cursor-pointer'>{from.fullname}</p>
            <p onClick={() => navigate(`/profile/${from.username}`)} className='text-slate-500 cursor-pointer'>@{from.username}</p>
            <p className='mt-8 text-slate-300 uppercase mb-2'>
                {
                    type === "post" ?
                    "new post"
                    :
                    type === "like" ? 
                    "Liked your post"
                    :
                    type === "follow" ? 
                    "Follows you"
                    :
                    "shared post with you"
                }
            </p>
            {
                type === "post" ?
                < BsTextIndentLeft size={20} className='text-pink-500'/>
                :
                type === "like" ?
                <FaHeart className='text-red-600'/>
                :
                type === 'follow' ?
                <RiUserFollowFill size={18} className='text-blue-500'/>
                :
                <LuShare2 size={18} className='text-green-500'/>
            }
        </div>
    )
}

export default SingleNotificationCard