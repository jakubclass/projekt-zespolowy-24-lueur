import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import SingleUserCard from './SingleUserCard'



const UsersCards = ({searchQuery}) => {
    
    const { data: users, isLoading } = useQuery({queryKey: ['users']})
    const { data: authUser } = useQuery({queryKey: ['authUser']})

    if(isLoading){
        return (
            <div className='w-full text-center mt-[30vh]'>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }

    const filteredUsers = users.filter(user => {
        if (searchQuery.startsWith("@")) {
            return user.username.toLowerCase().includes(searchQuery.substring(1).toLowerCase())
        } else {
            return user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        }
    })

    const renderedUsersCards = filteredUsers?.filter(user => user._id.toString() !== authUser._id.toString()).map(user => <SingleUserCard key={user._id} {...user}/>)


    if(filteredUsers.length === 0){
        return <p className='w-full mx-5 text-center block mt-[30vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>No users found</p>
    }


    return (
        <div className='grid grid-cols-4 gap-4 mt-8'>{renderedUsersCards}</div>
    )
}

export default UsersCards