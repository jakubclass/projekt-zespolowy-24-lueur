import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const MiniProfile = () => {
  const [avatarLoading, setAvatarLoading] = useState(true)
  const navigate = useNavigate()
    const { data: authUser, isLoading } = useQuery({queryKey: ['authUser']})

    if(isLoading){
        return (
            <div className="flex w-52 flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>
        )
    }

  return (
    <div onClick={() => navigate(`/profile/${authUser.username}`)} className='border-[1px] border-slate-600 bg-[rgb(40,41,50)] px-2 py-4 rounded-xl flex items-center gap-3 w-full mt-4 cursor-pointer hover:underline'>
        <div className="avatar ">
            <div className="w-10 rounded-full bg-[rgb(28,28,37)]">
                <img onLoad={() => setAvatarLoading(false)} src={authUser.profileImg} className={`${avatarLoading ? "opacity-0" : "opacity-[1]"}`}/>
            </div>
        </div>
        <div>
            <p className='text-sm montserrat-my'>{authUser.fullname}</p>
            <p className='text-slate-500  text-[12px]'>@{authUser.username}</p>
        </div>
    </div>
  )
}

export default MiniProfile