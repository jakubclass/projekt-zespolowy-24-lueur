import React from 'react'
import NotificationsHeader from './NotificationsHeader'
import NotificationsCards from './NotificationsCards'
import { useQuery } from '@tanstack/react-query'

const NotificationsPage = () => {
    const { error, isError } = useQuery({queryKey: ['notifications']})
    
    if(isError){
        return <h3>{error.message}</h3>
    }

    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
           <NotificationsHeader />
           <NotificationsCards />
        </div>
    )
}

export default NotificationsPage