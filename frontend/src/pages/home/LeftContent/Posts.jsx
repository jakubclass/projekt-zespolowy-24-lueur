import React, { useState } from 'react'
import AllPosts from './AllPosts'
import FollowingPosts from './FollowingPosts'




const Posts = () => {
    const [isAllPosts, setIsAllPosts] = useState(true)
    return (
        <div className='mt-8'>
            <div className='flex items-center text-slate-400 w-full justify-center gap-4'>
                <button onClick={() => setIsAllPosts(true)} className={` ${isAllPosts ? "text-[rgb(124,174,255)]" : ""}`}>All posts</button>
                <button onClick={() => setIsAllPosts(false)} className={` ${!isAllPosts ? "text-[rgb(124,174,255)]" : ""}`}>Following posts</button>
            </div>
            {
                isAllPosts ?
                <AllPosts />
                :
                <FollowingPosts />
            }
        </div>
    )
}

export default Posts