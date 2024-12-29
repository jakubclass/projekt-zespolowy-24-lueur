import { useQuery } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import SkeletonPost from '../../../components/SkeletonPost'
import SinglePost from '../../../components/SinglePost'




const FollowingPosts = () => {

    const { data:followingPosts, isLoading, isError, error } = useQuery({
        queryKey: ['followingPosts'],
        queryFn: async () => {
            try {
                const res = await fetch("/api/posts/following")
                const data = await res.json()

                if(data.error) throw new Error(data.error)
                console.log("FOLLOWING_POSTS", data)

                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    if(isError){
        return <div>{error.message}</div>
    }

    if(isLoading){
        return <SkeletonPost />
    }

    const renderedPosts = followingPosts?.map(post => <SinglePost key={post._id} {...post}/>)

    return (
        <div>{renderedPosts}</div>
    )
}

export default FollowingPosts