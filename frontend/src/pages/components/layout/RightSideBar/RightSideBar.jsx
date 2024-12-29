import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Following from './Following/Following'
import Notifications from './Notifications/Notifications'

const RightSideBar = () => {
  const { isLoading, data: authUser, error, isError } = useQuery({queryKey: ['authUser']})

  if(isError){
    return <h3>{error}</h3>
  }

  if(isLoading){
    return <h3>Loading</h3>
  }
  
  

  return (
    <div className='w-[340px] border-l-[1px] border-slate-800 ml-auto'>
      <Following following={authUser.following}/>
      <Notifications />
    </div>
  )
}

export default RightSideBar