import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Logo from "../../../public/logo.png"
import ProfileCard from './ProfileCard'
import { UserNotFound } from './UserNotFound'
import LeftContent from './LeftContent/LeftContent'
import RightContent from './RightContent/RightContent'



const ProfilePage = () => { 
    const [isMyPage, setIsMyPage] = useState(false)
    const { username } = useParams()
    const { data: authUser, isLoading: authIsLoadin} = useQuery({queryKey: ['authUser']})

    

    const { data: userProfile, isLoading, isError, error, refetch: refetchUserProfile} = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)

                console.log("userProfile: ", data)

                return data

            } catch (error) {
                console.log(error.message)
                throw new Error(error)
            }
        },
        retry: false
    })

    

    
    const { data: userPosts, isLoading: isLoadingPosts, isError: isErrorPosts, error: errorPosts, refetch: refetchUserPosts } = useQuery({
      queryKey: ['userPosts'],
      queryFn: async () => { 
        try{
          const res = await fetch(`/api/posts/user/${username}`)
          const data = await res.json()
          if(data.error) throw new Error(data.error)
            console.log("userPosts:", data)
          return data
          }catch(error){
            console.log(error.message)
            throw new Error(error)
          }
        }
    })
      
    useEffect(() => {
      refetchUserProfile()
      refetchUserPosts()
    }, [username])

    useEffect(() => {
      setIsMyPage(authUser?._id.toString() === userProfile?._id.toString())
      console.log("IS_MY_PAGE: ", authUser?._id.toString() === userProfile?._id.toString())
      // refetchUserProfile()
    }, [username, userProfile, authUser])

    if (isError || isErrorPosts) {
      return <UserNotFound message={error?.message || errorPosts.message} />;
    }
    

  return (
    <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
      <ProfileCard isMyPage={isMyPage}/>
      <div className='flex gap-6 mt-8'>
        <LeftContent />
        <RightContent isMyPage={isMyPage}/>
      </div>
    </div>
  )
}

export default ProfilePage