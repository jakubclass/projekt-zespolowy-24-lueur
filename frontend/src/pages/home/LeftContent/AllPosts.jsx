import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import SinglePost from '../../../components/SinglePost'
import SkeletonPost from '../../../components/SkeletonPost'





const AllPosts = () => {

    const { data:allPosts, isLoading, isError, error} = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            try {
                const res = await fetch('/api/posts/all')
                const data = await res.json()

                if(data.error) throw new Error(data.error)
                
                console.log("ALL_POSTS: ", data)
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
        return (
            <SkeletonPost />
        )
    }

    const renderedPosts = allPosts?.map(post => <SinglePost {...post} key={post?._id}/>)

    return (
        <div>{renderedPosts}</div>
    )
}

export default AllPosts