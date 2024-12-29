import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'



const SingleFollowingCard = ({username, profileImg, fullname, bio, _id, coverImg}) => {
    const navigate = useNavigate()
    const [coverLoading, setCoverLoading] = useState(true)
    const queryClient = useQueryClient()

    const { mutate:followUnfollowMutate } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/users/follow/${_id}`, {
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
                // queryClient.invalidateQueries({queryKey: ['userProfile']})
                // queryClient.invalidateQueries({queryKey: ['notifications']})

                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    const handleFollowUnfollow = () => {
        followUnfollowMutate()
    }

    return (
        <div className={`rounded-xl bg-[rgb(28,28,37)] h-[320px]`}>
            <div className="w-full rounded-t-xl overflow-hidden h-[150px] flex items-center justify-center">
                {
                    coverLoading ? 
                    <span className="loading loading-ring loading-lg"></span>
                    :
                    ""
                }
                <img onLoad={() => setCoverLoading(false)} src={coverImg ? coverImg : 'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}/>
            </div>
            <div className='flex items-center gap-6 mx-6 mt-[-45px]'>
                <div onClick={() => navigate(`/profile/${username}`)} className="avatar bg-blue-400 p-[2px] rounded-full cursor-pointer">
                    <div className="w-32 rounded-full">
                        <img src={profileImg} />
                    </div>
                </div>
                <div onClick={() => navigate(`/profile/${username}`)} className='cursor-pointer'>
                    <p className='montserrat-my tracking-wider font-bold text-xl mt-6'>{fullname}</p>
                    <p className='text-slate-500 text-sm'>@{username}</p>
                </div>
                <button onClick={handleFollowUnfollow} className='ml-auto px-4 py-2 rounded-xl bg-[rgb(0,119,254)] mt-6 text-sm'>Following</button>
            </div>
            <p className='w-[72%] block ml-auto text-slate-400 text-ellipsis overflow-hidden pr-6 mt-[-2px]'>{bio}</p>
        </div>
    )
}

export default SingleFollowingCard