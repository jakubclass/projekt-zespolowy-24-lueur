import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'




const SingleUserCard = ({username, profileImg, fullname, coverImg, followers, following, _id}) => {
    const [avatarLoading, setAvatarLoading] = useState(true)
    const { data: authUser } = useQuery({queryKey: ['authUser']})

    const queryClient = useQueryClient()

    const { mutate: mutateFollowUnfollow, isPending } = useMutation({
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
                queryClient.invalidateQueries({queryKey: ['users']})


                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    const isSubscribed = authUser.following.some(following => following._id.toString() === _id.toString())
    return (
        <div  className='bg-[rgb(28,28,37)] rounded-xl text-center justify-center montserrat-my hover:outline-blue-500 outline outline-2 transition-all duration-150 outline-[rgb(18,19,26)] outline-offset-[5px] cursor-pointer'>
            <Link to={`/profile/${username}`} className='block'>
                <div className='w-full h-[100px] overflow-hidden rounded-t-xl flex items-center justify-center'>
                    <img src={coverImg}/>
                </div>
                <div className="avatar cursor-pointer mt-[-50px]">
                    <div className="w-32 rounded-full bg-[rgb(40,41,50)]">
                        <img onLoad={() => setAvatarLoading(false)} src={profileImg} className={`${avatarLoading ? "opacity-0" : "opacity-100"}`}/>
                    </div>
                </div>
                <p className='mt-8 text-lg cursor-pointer'>{fullname}</p>
                <p className='text-slate-500 cursor-pointer'>@{username}</p>
                <div className='flex items-center gap-4 text-[12px] text-slate-500 justify-center mt-4'>
                    <p>Followers: {followers.length}</p>
                    <p>Following: {following.length}</p>
                </div>
            </Link>
            <button disabled={isPending} onClick={mutateFollowUnfollow} className={`inline-block my-4 ${isSubscribed ? "bg-[rgb(40,41,50)]" : "bg-blue-500"} rounded-xl block w-[120px] h-[40px] text-center`}>
                {
                    isPending ? 
                    <span className="loading loading-ring loading-sm"></span>
                    :
                    isSubscribed ?
                    "Unfollow"
                    :
                    "Follow"
                }
            </button>
        </div>
    )
}

export default SingleUserCard