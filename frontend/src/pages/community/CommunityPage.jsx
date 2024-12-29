import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import CommunityHeader from './CommunityHeader'
import CommunityLeftSection from './CommunityLeftSection'
import CommunityRightSection from './CommunityRightSection'





const CommunityPage = () => {
    const { name } = useParams()
    const { data: communityProfile, isLoading, isError, error, refetch: refetchCommunityProfile, isPending} = useQuery({
        queryKey: ["communityProfile"],
        queryFn: async () => {
                const res = await fetch(`/api/communities/${name}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("COMMUNITY_PROFILE: " , data)
                return data
        },
        onError: (error) =>{
            console.log(error.message)
        }
    })


    const { data: communityPosts, isLoading: isLoadingCommunityPosts, isError: isErrorCommunityPosts, error: errorCommunityPosts, refetch: refetchCommunityPosts} = useQuery({
        queryKey: ['communityPosts'],
        queryFn: async () => {
                const res = await fetch(`/api/posts/community/${name}`)
                if (!res.ok) {
                    throw new Error(`Ошибка: ${res.statusText}`);
                }
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("COMMUNITY_POSTS: " , data)
                return data
        },
        onError: (error) =>{
            console.log(error.message)
        }
    })


    useEffect(() => {
        refetchCommunityProfile()
        refetchCommunityPosts()
    }, [name])

    if(isError || isErrorCommunityPosts){
    return (
        <p className='w-full mx-5 text-center block mt-[35vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>
            Error: {error?.message || errorCommunityPosts?.message || 'Unknown error'}
        </p>
    )
}


    if(isLoading){
        return (
            <div className='w-full h-[80vh] flex items-center justify-center'>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        ) 
    }

    return (
        <div className='w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll montserrat-my pb-8'>
            <CommunityHeader />
            <div className='flex gap-6 mx-28 mt-4'>
                <CommunityLeftSection />
                <CommunityRightSection />
            </div>
        </div>
    )
}

export default CommunityPage