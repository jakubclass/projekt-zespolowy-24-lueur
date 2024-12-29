import React from 'react'
import SingleFollowing from './SingleFollowing'
import { Link } from "react-router-dom"






const Following = ({following}) => {
    
const renderedFollowingUsers = following.slice(0, 5).map(user => <SingleFollowing {...user} key={user._id}/>)

  return (
    <>
      <p className='uppercase text-sm text-slate-400 ml-6 mt-8 tracking-widest montserrat-my '>following</p>
      <div className='flex flex-col gap-4 w-full mt-8'>
        {
          following.length === 0 ?
          <p className='ml-6 text-sm text-slate-500'>No followings</p>
          :
          renderedFollowingUsers
        }
      </div>
      <Link to={'/following'} className='text-slate-500 bg-[rgb(28,28,37)] open-sans-my uppercase w-fit mx-auto px-6 py-2 rounded-xl tracking-widest text-sm text-center block hover:underline mt-4'>See following</Link>
    </>
  )
}

export default Following