import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom'



export const SingleCommunityCard = ({name, coverImg, fullname, location, followers, profileImg}) => {
    const { data: authUser, isLoading} = useQuery({queryKey: ['authUser']})
    const [coverLoading, setCoverLoading] = useState(true)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate: mutateFollowUnfollowCommunity, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/communities/${name}/follow`, {
                    method: "POST"
                })
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("FOLLOW_UNFOLLOW COMMMUNITY: ", data)

                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['communities']})
                queryClient.invalidateQueries({queryKey: ['communityProfile']})

                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    return (
        <div className='h-[330px] bg-[rgb(28,28,37)] rounded-xl'>
            <div className='w-full flex items-center justify-center overflow-hidden rounded-t-xl h-[120px] bg-[rgb(40,41,50)]'>
            {
                coverLoading ? 
                <span className="loading loading-ring loading-lg"></span>
                :
                ""
            }
                <img src={coverImg} onLoad={() => setCoverLoading(false)} className='min-w-full min-h-full'/>
            </div>
            <div className='p-6 pt-4 montserrat-my'>
                <div onClick={() => navigate(`/communities/${name}`)} className='flex items-center gap-2 cursor-pointer'>
                    <div className="avatar">
                        <div className="w-12 rounded-xl">
                            <img src={profileImg} />
                        </div>
                    </div>
                    <p className='text-slate-100 tracking-wider'>{fullname}</p>
                </div>
                <div className='flex items-center gap-2 text-slate-500 text-sm mt-2'>
                    <p>{location}</p>
                    <GoDotFill />
                    <p>{followers.length} Members</p>
                </div>

                <div className="avatar-group -space-x-6 rtl:space-x-reverse mt-2">
                    {
                        followers.sort((a, b) => {
                            if(a.createdAt > b.createdAt){
                                return -1
                            }
                            if(a.createdAt < b.createdAt){
                                return 1
                            }
                            return 0
                        }).slice(0, 5).map(follower => {
                            return (
                            <Link key={follower._id} to={`/profile/${follower.username}`} className="avatar">
                                <div className="w-10">
                                <img src={follower.profileImg} />
                                </div>
                            </Link>

                            )
                        })
                    }
                    {
                        followers.length > 5 ? 
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content w-12">
                            <span>{followers.length - 5}</span>
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>

                <button onClick={mutateFollowUnfollowCommunity} disabled={isPending} className={`w-full block border-2 ${followers.some(follower => follower._id === authUser._id) ? " border-[rgb(40,41,50)] " : " bg-[rgb(40,41,50)] border-[rgb(40,41,50)]"}  rounded-xl text-slate-300 mt-2 py-2 text-sm`}>
                    {
                        followers.some(follower => follower._id === authUser._id) ?
                        "Leave Community"
                        :
                        "Join Community"
                    }
                </button>
            </div>
        </div>
    )
}
