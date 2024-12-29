import { IoSendOutline } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MdOutlineFolderDelete } from "react-icons/md";
import React, { useRef, useState } from 'react'
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CreatePost = () => {
  const imgRef = useRef(null)
  const [img, setImg] = useState(null)
  const [text, setText] = useState("")
  const queryClient = useQueryClient()
  const [avatarLoading, setAvatarLoading] = useState(true)
  const { data: authUser, isLoading} = useQuery({queryKey: ['authUser']})
  const { name: community } = useParams()

  const { mutate, isPending: isPendingCreatePost } = useMutation({
    mutationFn: async ({text, img}) => {
      try {
        const res = await fetch('/api/posts/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text, img, community: community || null})
        })

        const data = await res.json()
        if(data.error) throw new Error(data.error)
        
        console.log("CREATED_POST: ", data)
        queryClient.invalidateQueries({queryKey: ['authUser']})
        queryClient.invalidateQueries({queryKey: ['userProfile']})
        queryClient.invalidateQueries({queryKey: ['userPosts']})
        queryClient.invalidateQueries({queryKey: ['allPosts']})
        queryClient.invalidateQueries({queryKey: ['communityPosts']})

        return data

      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        // throw new Error(error)
      }
    }
  })

  if(isLoading){
    return <div className="skeleton w-full h-[150px]"></div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutate({text, img})
    setText('')
    setImg(null)
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result)
      };
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={` rounded-xl bg-[rgb(28,28,37)] montserrat-my ${img ? "pb-2" : ""}`}>
      <div className='p-6  text-slate-300'>Post Something</div>
      <div className='divider mt-[-15px]'></div>
      <div className='flex items-center p-6 pt-0 gap-4 text-slate-300 w-full  '>
        <div className="avatar">
          <div className="w-14 rounded-full bg-[rgb(40,41,50)]">
            <img src={authUser.profileImg} onLoad={() => setAvatarLoading(false)} className={`${avatarLoading ? "opacity-0" : "opacity-[1]"}`}/>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="What is on your mind?" className="input w-[600px] bg-[rgb(28,28,37)] active:bg-[rgb(28,28,37)] focus:bg-[rgb(28,28,37)] focus:outline-none focus:border-none" />
          <input type="file" accept="image/*" hidden ref={imgRef} onChange={handleImgChange} />
        </form>
        {
          img ? 
          <MdOutlineFolderDelete size={28} onClick={() => setImg(null)} className="text-red-500 hover:text-red-300 cursor-pointer transition-all duration-150 ml-auto"/>
          :
          <RiImageAddLine onClick={() => imgRef.current.click()} size={24} className="text-slate-500 hover:text-slate-300 cursor-pointer transition-all duration-150 ml-auto"/>
        }
        <button onClick={handleSubmit} disabled={isPendingCreatePost}>
          {
            isPendingCreatePost?
            <span className="loading loading-spinner loading-md text-slate-500"></span>
            :
            <IoSendOutline  size={24} className="text-slate-500 hover:text-slate-300 cursor-pointer transition-all duration-150"/>
          }
        </button>
      </div>
        {
          !img ? 
          ""
          :
          <div className="max-w-[500px]  overflow-hidden rounded-xl flex items-center justify-center mx-auto mb-4">
            <img src={img}/>
          </div>
        }
    </div>
  )
}

export default CreatePost