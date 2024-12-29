import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'




const CommunityHeader = () => {
    const queryClient = useQueryClient()
    const { data: authUser } = useQuery({queryKey: ['authUser']})
    const { data: communityProfile, isLoading } = useQuery({queryKey: ['communityProfile']})
    const { mutate: mutateFollowUnfollowCommunity, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/communities/${communityProfile.name}/follow`, {
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

    if(isLoading){
        return <h3>Header is Loading</h3>
    }

    return (
        <div>
            <div className='w-full h-[300px] flex items-center justify-center overflow-hidden relative z-0'>
                <img src={communityProfile.coverImg} className='min-w-full min-h-full'/>
            </div>
            <div className='bg-[rgb(28,28,37)] mx-28 px-10 flex items-center h-[200px] mt-[-70px] relative z-20 rounded-xl gap-8'>
                <div className="avatar mt-[-150px] p-2 bg-[rgb(40,41,50)] rounded-2xl">
                    <div className="w-40 rounded-xl">
                        <img src={communityProfile.profileImg} />
                    </div>
                </div>
                <div className='self-start mt-4'>
                    <div className='flex items-center gap-8'>
                        <div className='flex items-center gap-4'>
                            <p className='text-2xl text-white font-bold tracking-wider'>{communityProfile.name}</p>
                        </div>
                        {
                            communityProfile.admins.some(admin => admin._id.toString() === authUser._id.toString()) ?
                            <button className="text-sm  px-6 py-2 rounded-xl bg-blue-500">Update</button>
                            :
                            <button onClick={mutateFollowUnfollowCommunity} className={`text-sm  px-6 py-2 rounded-xl border-2 border-blue-500 ${communityProfile.followers.some(user => user._id.toString() === authUser._id.toString()) ? " bg-[rgb(40,41,50)]" : " bg-blue-500 "}`}>
                                {
                                    communityProfile.followers.some(user => user._id.toString() === authUser._id.toString()) ?
                                    "Unfollow"
                                    :
                                    "Follow"
                                }
                            </button>
                        }
                    </div>

                    <div className='flex items-center gap-14 w-full text-sm mt-4 text-slate-500'>
                        <div>
                            <p>{communityProfile.fullname}</p>
                            <p className='mt-1'>{communityProfile.location}</p>
                        </div>
                        
                        <div>
                            <p>
                                <span className='w-[120px] inline-block mr-4'>Headqurters</span>
                                <span className='text-slate-300'>{communityProfile.headqurters}</span>
                            </p>
                            <p>
                                <span className='w-[120px] inline-block mr-4 mt-1'>Company Size</span>
                                <span className='text-slate-300'>{communityProfile.companySize}+ Employees</span>
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className='w-[100px] inline-block'>Type</span>
                                <span className='text-slate-300'>{communityProfile.type}</span>
                            </p>
                            <p>
                                <span className='w-[100px] inline-block mt-1'>Industry</span>
                                <span className='text-slate-300'>{communityProfile.industry}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityHeader