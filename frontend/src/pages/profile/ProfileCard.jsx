

import { FaRegBell, FaRegBellSlash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

const ProfileCard = ({isMyPage}) => {
    // const { username } = useParams()
    const [avatarLoading, setAvatarLoading] = useState(true)
    const queryClient = useQueryClient()
    const { data: authUser, isLoading: authIsLoading} = useQuery({queryKey: ['authUser']})
    const { data:userProfile, isLoading } = useQuery({queryKey: ['userProfile']})
    const { data:userPosts, postsIsLoading } = useQuery({queryKey: ['userPosts']})
    const isFollowing = isLoading ? false : authUser?.following?.some(user => user._id.toString() === userProfile._id.toString())
    const notifyMe = isLoading ? false : userProfile?.notify?.includes(authUser._id.toString()) 

    const { mutate, isPending: isPendingFollowUnfollow } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/users/follow/${userProfile._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: ""
                })

                const data = await res.json()

                if(data.error) throw new Error(data.error)
                console.log("FOLLOW_UNFOLLOW: ", data)
                
                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                // queryClient.invalidateQueries({queryKey: ['notifications']})

                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })


    const { mutate: mutateNotifyMe, isPending: isPendingNotifyMe} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/users/notifyme/${userProfile.username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: ""
                })

                const data = await res.json()
                if(data.error) throw new Error(data.error)
                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                console.log("NOTIFY_ME: ", data)
                toast.success(data.message)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })


    const handleFollow = () => {
        // alert(username)
        mutate()
    }

  return (
    <div className='rounded-xl overflow-hidden w-full bg-[rgb(28,28,37)]'>
        <div className='h-[350px] overflow-hidden flex items-center justify-center'>
            {
                isLoading ?
                ""
                :
                <img className='bg-[rgb(28,28,37)] min-w-full min-h-full' src={userProfile.coverImg} />
            }
        </div>
        
        <div className='flex items-center justify-end relative'>
            
            <div className='flex items-center gap-10 absolute left-[56px] top-[-150px]'>
                {
                    isLoading ?
                    <div className='skeleton w-48 h-48 block rounded-full'></div>
                    :
                    <div className="avatar">
                        <div className="w-48 rounded-full bg-[rgb(40,41,50)]">
                            <img src={isLoading ? "" : userProfile.profileImg} onLoad={() => setAvatarLoading(false)} className={`${avatarLoading ? "opacity-0" : "opacity-[1]"}`}/>
                        </div>
                    </div>
                }

                {
                    isLoading ? 
                    <div>
                      <p className='skeleton h-8 w-44'></p>  
                      <p className='skeleton h-4 w-16 mt-4'></p>  
                    </div>
                    :
                    <div className=''>
                        <p className='montserrat-my tracking-widest font-bold text-3xl bg-[rgb(38,38,43)] p-2 rounded-xl shadow-sm text-slate-200 shadow-[rgb(38,38,43)]'>{userProfile?.fullname}</p>
                        <p className='text-slate-500 bg-[rgb(38,38,43)] p-2 rounded-xl w-fit mt-2'>@{userProfile?.username}</p>
                    </div>
                }
            </div>

            {
                isLoading ? 
                <div className='skeleton w-72 h-16 mr-32 my-4'></div>
                :
                <div className='flex items-center gap-6 mr-32 py-4'>
                    {
                        isFollowing
                        && 
                        <button disabled={isPendingNotifyMe} onClick={mutateNotifyMe} className={`flex items-center justify-center w-[40px] h-[40px] rounded-xl ${notifyMe ? "bg-[rgb(40,41,50)] text-slate-300" : "bg-blue-500 text-slate-300"}`}>
                            {
                                isPendingNotifyMe ?
                                <span className="loading loading-ring loading-md"></span>
                                :
                                notifyMe ? 
                                <FaRegBellSlash size={21}/>
                                :
                                <FaRegBell size={21}/>
                            }
                        </button>
                    }
                    {
                        !isMyPage ? 
                        <button disabled={isPendingFollowUnfollow} onClick={handleFollow} className={` ${ isFollowing ? " border-2 border-[rgb(0,119,254)] text-slate-300" : " bg-[rgb(0,119,254)]"} rounded-xl w-[120px] h-[45px] flex items-center justify-center`}>
                        {
                            isPendingFollowUnfollow?
                            <span className="loading loading-ring loading-md"></span>
                            :
                            isFollowing ?
                            "Unfollow"
                            :
                            "Follow"
                        }
                        </button>
                        :
                        <Link to={`/profile/${authUser.username}/update`} className='bg-[rgb(0,119,254)] rounded-xl px-6 py-2'>Edit profile</Link>
                    }
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Posts</p>
                        <p className='text-lg'>{userPosts?.length || "0"}</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Followers</p>
                        <p className='text-lg'>{userProfile?.followers.length}</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Following</p>
                        <p className='text-lg'>{userProfile?.following.length}</p>
                    </div>
                    <div className='flex items-center justify-center flex-col gap-2 '>
                        <p className='font-light text-slate-400'>Liked</p>
                        <p className='text-lg'>{userProfile?.likedPosts.length}</p>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default ProfileCard