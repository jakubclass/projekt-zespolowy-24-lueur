import React from 'react'
import CreatePost from '../../profile/RightContent/CreatePost'
import Posts from './Posts'




const LeftContent = () => {
    return (
        <div className='flex-grow'>
            <CreatePost />
            <Posts />
        </div>
    )
}

export default LeftContent