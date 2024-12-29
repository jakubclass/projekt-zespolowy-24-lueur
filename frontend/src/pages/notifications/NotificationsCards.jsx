import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SingleNotificationCard from './SingleNotificationCard'
import { FaRegSadTear } from "react-icons/fa";



const NotificationsCards = () => {
    const { data: notifications, isLoading } = useQuery({queryKey: ['notifications']})
    
    if(isLoading){
        return (
            <div className='mt-8 grid grid-cols-3 gap-4'>
                <div className='skeleton h-[400px] rounded-xl'></div>
                <div className='skeleton h-[400px] rounded-xl'></div>
                <div className='skeleton h-[400px] rounded-xl'></div>                
            </div>
        )
    }

    if(notifications?.length === 0){
        return <p className='text-slate-300 w-fit mx-auto text-center mt-56 text-4xl bg-[rgb(28,28,37)] px-10 py-16 rounded-xl'>No notifications found <FaRegSadTear className='inline' /></p>
    }
    
    const renderedNotifications = notifications?.map(notification => <SingleNotificationCard key={notification?._id} {...notification}/>)
    

    return (
        <div className='mt-8 grid grid-cols-3 gap-4'>
            {renderedNotifications}
        </div>
    )
}

export default NotificationsCards