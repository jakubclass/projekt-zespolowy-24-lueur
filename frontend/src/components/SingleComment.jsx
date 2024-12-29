import React from 'react'
import { useNavigate } from "react-router-dom"


const SingleComment = ({text, user, _id, createdAt}) => {
    const navigate = useNavigate()
    return (
        <div className=' px-4 mx-2 pb-4 flex  items-center pt-4 hover:bg-slate-800 rounded-xl mb-1'>
            <div onClick={() => navigate(`/profile/${user.username}`)} className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                    <img src={user.profileImg} />
                </div>
            </div>
            <div onClick={() => navigate(`/profile/${user.username}`)} className='ml-4 cursor-pointer'>
                <p className='text-sm text-slate-300'>{user.fullname}</p>
                <p className='text-[12px] text-slate-500'>@{user.username}</p>
            </div>
            <p className='text-slate-300 text-sm ml-10 px-6 py-2 bg-[rgb(40,41,50)] rounded-full'>{text}</p>
        </div>
    )
}

export default SingleComment