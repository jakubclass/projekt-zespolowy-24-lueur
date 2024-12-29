import React from 'react'
import { useNavigate } from 'react-router-dom'




const AdminCard = ({_id, username, profileImg, fullname}) => {
    const navigate = useNavigate()
    return (
        <div key={_id} onClick={() => navigate(`/profile/${username}`)} className='flex items-center gap-2 px-6 pb-4 cursor-pointer'>
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src={profileImg} alt='profileimg' />
                </div>
            </div>
            <div>
                <p className='text-sm text-slate-300'>{fullname}</p>
                <p className='text-slate-500 text-[12px]'>@{username}</p>
            </div>
        </div>
    )
}

export default AdminCard