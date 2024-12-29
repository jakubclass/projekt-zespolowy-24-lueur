import React from 'react'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import SingleSuggestedUser from '../../../components/SingleSuggestedUser'





const SuggestedUsers = () => {
    const { isLoading, data: suggestedUsers, error, isError } = useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: async () => {
            try {
                const res = await fetch("/api/users/suggested")
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("SUGGESTED_USERS: ", data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    if(isError){
        return <h2>{error.message}</h2>
    }

    if(isLoading){
        return <div className='skeleton w-full h-[200px]'></div>
    }


    const renderedUsers = suggestedUsers?.map(user => <SingleSuggestedUser {...user} key={user?._id}/>)
    


    return (
        <div className='rounded-xl bg-[rgb(28,28,37)] mt-6 montserrat-my pb-6'>
            <p className='text-slate-300 pt-6 pl-6'>Suggested Users</p>
            <div className='divider'></div>
            
            <div className='flex items-center flex-col gap-4 w-full px-6'>
                {
                    suggestedUsers.length === 0 ? 
                    <p className='text-slate-500'>No suggested users</p>
                    :
                    renderedUsers
                }
            </div>
        

        </div>
    )
}

export default SuggestedUsers