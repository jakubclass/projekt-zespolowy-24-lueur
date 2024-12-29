import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import SingleNotificationSideBar from './SingleNotificationSideBar'
import { Link } from 'react-router-dom'

const Notifications = () => {
    // const { data: notifications, isLoading, isError, error, isPending } = useQuery({
    //     queryKey: ['notifications'],
    //     queryFn: async () => {
    //         try {
    //             const res = await fetch('/api/notifications')
    //             const data = await res.json()
    //             if(data.error) throw new Error(data.error)
    //             console.log("NOTIFICATIONS: ", data)
    //             return data
    //         } catch (error) {
    //             console.log(error.message)
    //             toast.error(error.message)
    //         }
    //     },
    // })

    
    
    const { data: notifications, isLoading, error, isError, isPending } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/notifications')
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("NOTIFICAIONTS: ", data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    
    if(isError){
        return <h3>{error.message}</h3>
    }

    if(isLoading || isPending){
        return <div className='skeleton rounded-xl h-[100px] mt-8 mx-auto w-[80%]'></div>

    }

    const renderedNotifications = notifications?.slice(0, 5).map(notification => <SingleNotificationSideBar {...notification} key={notification._id}/>)

    return (
        <>
            <p className='uppercase text-sm text-slate-400 ml-6 mt-8 tracking-widest montserrat-my '>notifications</p>
            <div className='flex flex-col gap-4 w-full mt-8'>
                {
                    notifications?.length === 0 ? 
                    <p className='ml-6 text-sm text-slate-500'>No notifications</p>
                    :
                    renderedNotifications
                }
            </div>
            <Link to={'/notifications'} className='text-slate-500 bg-[rgb(28,28,37)] open-sans-my uppercase w-fit mx-auto px-6 py-2 rounded-xl tracking-widest text-sm text-center block hover:underline mt-4'>See notifications</Link>
        </>
    )
}

export default Notifications