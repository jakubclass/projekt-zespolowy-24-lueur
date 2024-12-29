import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminCard from './AdminCard'
import FollowerCard from './FollowerCard'
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-hot-toast"
import { MdOutlineAlternateEmail } from "react-icons/md";


const CommunityLeftSection = () => {
    const { data: communityProfile, isLoading } = useQuery({queryKey: ['communityProfile']})
    const { data: authUser } = useQuery({queryKey: ['authUser']})
    const [username, setUsername] = useState("")
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: mutateAddCommunityAdmin, isPending} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/communities/addAdmin', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name: communityProfile.name, username})
                })

                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("ADD_COMMUNITY_ADMIN: ", data)

                queryClient.invalidateQueries({queryKey: ['communityProfile']})
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        },
        onSettled: () => {
            setUsername("")

        }
    })
    if(isLoading){
        return <h3>LeftSection Loading</h3>
    }

    const handleAddAdmin = () => {
        if(!communityProfile.name || !username){
            toast.error("Provide username")
            return
        }
        mutateAddCommunityAdmin()
        document.getElementById('my_modal_1').close()
    }
    const isAdmin = communityProfile.admins.some(admin => admin._id.toString() === authUser._id.toString())
    const renderedAdmins = communityProfile.admins.map(admin => <AdminCard key={admin._id} {...admin}/>)
    const renderedFollowers = communityProfile.followers.slice(0, 10).map(follower => <FollowerCard key={follower._id} {...follower}/>)

    return (
        <div className='w-[25%] shrink-0'>
            {/* ADMINS */}
            <div className='rounded-xl bg-[#1C1C25] w-full'>
                <div className='flex items-center justify-between p-6'>
   
                    <p className=' text-slate-300'>Admins</p>
                    {
                        isAdmin ?
                        <button  onClick={()=>document.getElementById('my_modal_1').showModal()}><CiCirclePlus size={25} className='text-slate-300'/></button>
                        :
                        ""
                    }
                </div>
                <div className='divider mt-[-10px]'></div>
                { renderedAdmins }
            </div>

            {/* FOLLOWERS */}
            <div className='rounded-xl bg-[#1C1C25] w-full mt-4 pb-4'>
                <p className='p-6 text-slate-300'>Followers</p>
                <div className='divider mt-[-10px]'></div>
                <div className='flex items-center flex-wrap px-5 gap-2'>
                    { renderedFollowers }
                </div>
            </div>

            {/* ADD ADMIN MODAL WINDOW */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-[rgb(28,28,37)] text-slate-300 text-center">
                    <h3 className="font-bold text-lg">Add administrator to this community</h3>
                    <p className="py-2">Provide username</p>
                    <div className="modal-action">
                        <div method="dialog" className='flex  items-center flex-col w-full gap-4'>
                            <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                                <MdOutlineAlternateEmail />
                                <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="grow" placeholder="Username" />
                            </label>
                            <div className='flex items-center gap-4'>
                                <button onClick={handleAddAdmin} disabled={isPending} className="bg-blue-500 block text-white px-4 py-2 rounded-xl w-[150px] h-[40px]">
                                    {
                                        isPending?
                                        <span className="loading loading-ring loading-md"></span>
                                        :
                                        "Add admin"
                                    }
                                </button>
                                <button onClick={()=>document.getElementById('my_modal_1').close()} className="bg-slate-700 text-white px-4 py-2 rounded-xl">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default CommunityLeftSection