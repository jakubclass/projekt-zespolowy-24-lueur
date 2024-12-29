import React, { useEffect, useState } from 'react'
import FollowingHeader from './FollowingHeader'
import FollowingCards from './FollowingCards'
import { useQuery } from '@tanstack/react-query'





const FollowingPage = () => {
    // alphasc, alphdesc,folldesc, follasc, default
    const [sortType, setSortType] = useState("default")
    const [searchQuery, setSearchQuery] = useState("")
    const { isError, error, isLoading } = useQuery({queryKey: ['authUser']})

    useEffect(() => {
        // alert(sortType)
        console.log("SORT_TYPE: ", sortType)
    }, [sortType])

    if(isError){
        return <h3 className='w-full text-center'>Error: {error}</h3>
    }

    if(isLoading){
        return <div className='skeleton w-full h-[500px] px-10 pt-10 rounded-xl'></div>
    }

    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <FollowingHeader setSortType={setSortType} sortType={sortType} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <FollowingCards sortType={sortType} searchQuery={searchQuery}/>
        </div>
    )
}

export default FollowingPage