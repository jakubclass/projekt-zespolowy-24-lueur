import React from 'react'
import { useNavigate } from 'react-router-dom'





const FollowerCard = ({profileImg, username}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/profile/${username}`)} className='cursor-pointer'>
            <div className="avatar">
                <div className="w-14 rounded-full">
                    <img src={profileImg} />
                </div>
            </div>
            <p className='text-slate-500 text-[12px] overflow-hidden w-[50px] text-center text-ellipsis'>@{username}</p>
        </div>
    )
}

export default FollowerCard