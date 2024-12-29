import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { GrClearOption } from "react-icons/gr";


const NotificationsHeader = () => {

    const { isLoading, isError } = useQuery({queryKey: ['notifications']})
    const queryClient = useQueryClient()
    const { mutate:deleteNotificationsMutate } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/notifications", {
                    method: "DELETE",
                    body: ""
                })
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("NOTIFICATIONS_DELETED: ", data.message)
                queryClient.invalidateQueries({queryKey: ['notifications']})
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })


    return (
        <div className='flex w-full justify-between items-baseline'>
                <p className='font-bold text-3xl tracking-widest raleway-my'>Notifications List</p>
                <button disabled={isLoading || isError} onClick={deleteNotificationsMutate} className='uppercase montserrat-my bg-[rgb(28,28,37)] px-4 py-2 rounded-xl text-slate-300 text-sm flex items-center gap-2'>
                    <span>clear all</span>
                    <GrClearOption size={18}/>
                </button>
        </div>
    )
}

export default NotificationsHeader