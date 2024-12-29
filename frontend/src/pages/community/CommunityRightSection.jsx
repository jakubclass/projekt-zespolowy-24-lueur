import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SinglePost from "../../components/SinglePost"
import CreatePost from '../profile/RightContent/CreatePost'



const CommunityRightSection = () => {
    const { data: communityProfile, isLoading } = useQuery({queryKey: ['communityProfile']})
    const { data: communityPosts, isLoading: isLoadingCommunityPosts } = useQuery({queryKey: ['communityPosts']})
    const { data: authUser, isLoading: isLoadingAuthUser } = useQuery({queryKey: ['authUser']})

    if(isLoading || isLoadingCommunityPosts || isLoadingAuthUser){
        return <span className="loading loading-ring loading-lg block mx-auto mt-[10vh]"></span>
    }


    const renderedCommunityPosts = communityPosts?.map(post => <SinglePost key={post._id} {...post}/>)

    return (
        <div className='grow '>
            <div className='rounded-xl p-6 bg-[rgb(28,28,37)] mb-6'>
                <p className='text-xl text-slate-300'>About Company</p>
                <p className='text-sm text-slate-500 mt-4'>{communityProfile.about}</p>
            </div>
            {
                communityProfile.admins.some(admin => admin._id.toString() === authUser._id.toString()) ?
                <CreatePost />
                :
                ""
            }
            {
                renderedCommunityPosts.length === 0 ? 
                <h3 className='my-6 w-full block text-center text-slate-500'>This community does not have posts yet</h3>
                :
                renderedCommunityPosts
            }
        </div>
    )
}

export default CommunityRightSection