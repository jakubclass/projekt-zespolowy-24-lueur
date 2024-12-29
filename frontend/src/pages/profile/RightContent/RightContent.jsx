


import React from 'react'
import CreatePost from './CreatePost'
import Posts from './Posts'

const RightContent = ({isMyPage}) => {


  return (
    <div className='flex-grow'>
      { 
        isMyPage ? 
        <CreatePost />
        :
        <div className='mt-[-24px]'></div>
      }
        <Posts />
    </div>
  )
}

export default RightContent