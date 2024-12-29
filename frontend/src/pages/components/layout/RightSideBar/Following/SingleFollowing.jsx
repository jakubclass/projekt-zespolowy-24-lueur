import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'




const SingleFollowing = ({username, profileImg, fullname}) => {
    const [avatarLoading, setAvatarLoading] = useState(true)
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/profile/${username}`)} className='flex items-center px-6 gap-2 cursor-pointer hover:underline'>
            <div className="avatar">
                <div className="w-10 rounded-full bg-[rgb(40,41,50)]">
                    <img onLoad={() => setAvatarLoading(false)} src={profileImg} className={`${avatarLoading ? "opacity-0" : "opacity-[1]"}`} />
                </div>
            </div>
            <p className='text-sm text-slate-400 montserrat-my'>{fullname}</p>
        </div>
    )
}

export default SingleFollowing