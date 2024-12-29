import React, { useState } from 'react'
import UsersHeader from './UsersHeader'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import UsersCards from './UsersCards'




const UsersPage = () => {

    const [searchQuery, setSearchQuery] = useState("")

    const { data: users, isLoading, error, isError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('/api/users/all')
            const data = await res.json()
            if(data.error) throw new Error(data.error)
            console.log("ALL_USERS: ", data)
            return data
        },
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        }
    })

    if(isError){
        return <h3>{error.message}</h3>
    }


    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <UsersHeader isLoading={isLoading} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <UsersCards searchQuery={searchQuery}/>
        </div>
    )
}

export default UsersPage