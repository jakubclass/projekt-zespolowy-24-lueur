import React from 'react'
import { useQuery } from "@tanstack/react-query"
import SingleCommunityLeftMenu from './SingleCommunityLeftMenu'

const PagesYouLike = () => {
  const { data: authUser, isLoading, error, isError} = useQuery({queryKey: ['authUser']})

  if(isError){
    return <h3>{error}</h3>
  }

  if(isLoading){
    return <h3>Loading pages you like</h3>
  }

  const renderedCommunities = authUser.communities.slice(0, 3).map(community => <SingleCommunityLeftMenu key={community._id} {...community}/>)

  return (
    <div className='mt-20 '>
        <p className='mb-8 tracking-widest uppercase text-slate-500 text-sm'>pages you like</p>
        {
          authUser.communities.length === 0 ?
          <p className='text-[12px] text-slate-500'>No pages yet...</p>
          :
          renderedCommunities
        }
    </div>
  )
}

export default PagesYouLike