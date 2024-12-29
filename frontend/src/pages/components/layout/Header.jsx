import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-hot-toast"


const Header = () => {
  const [avatarLoading, setAvatarLoading] = useState(true)
    const { data: authUser, isLoading } = useQuery({queryKey: ['authUser']})
    // const { data: notifications} = useQuery({queryKey: ['notifications']})
    const navigate = useNavigate()
    const { mutate: mutateLogout } = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
                body: ""
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)
            console.log("LOG_OUT: ", data)
            navigate("/login")
            return data
        },
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        }
    })

  return (
    <div className='w-full px-16 py-8 flex items-center justify-between bg-[rgb(28,28,37)] border-b-[1px] border-slate-800'>
        <Link to={'/'} className='raleway-my tracking-widest text-3xl uppercase'>Lueur</Link>
        <label className="input input-bordered flex items-center gap-2 w-[500px] bg-[rgb(40,41,50)]">
            <input type="text" className="grow" placeholder="Search" />
            <CiSearch size={20}/>
        </label>
        <div className=' flex items-center gap-6'>
            <IoLogOutOutline onClick={mutateLogout} className='rotate-180 cursor-pointer' size={23}/>
            <AiOutlineMessage size={23}/>
            <Link to={'/notifications'} className='relative'>
                <IoIosNotificationsOutline size={23}/>
            </Link>
            {
                isLoading ? 
                <div className='skeleton w-12 h-12 rounded-full'></div>
                :
                <Link to={`/profile/${authUser.username}`} className="avatar">
                    <div className="w-12 rounded-full bg-[rgb(40,41,50)]">
                        <img src={authUser.profileImg} onLoad={() => setAvatarLoading(false)} className={`${avatarLoading ? "opacity-0" : "opacity-[1]"}`}/>
                    </div>
                </Link>
            }
            <FaCaretDown />
        </div>
    </div>
  )
}

export default Header