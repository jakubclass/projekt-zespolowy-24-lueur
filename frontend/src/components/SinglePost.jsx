import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoSendOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa6";
import SingleComment from './SingleComment';
import { useNavigate } from 'react-router-dom';
import { LuShare2 } from "react-icons/lu";
import SingleRepostUser from './SingleRepostUser';

const SinglePost = ({comments, createdAt, likes, user, text, _id, img, community}) => {
    const [imageLoading, setImageLoading] = useState(true)
    const [selectedRepostUser, setSelectedRepostUser] = useState('')
    const [avatarLoading, setAvatarLoading] = useState(true)
    const navigate = useNavigate()
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState("")
    const { data:authUser, isLoading } = useQuery({queryKey: ['authUser']})
    const queryClient = useQueryClient()
    const { mutate, isPending: isPendingLike } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/like/${_id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: ""
                })
                
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                
                console.log(data.message)
                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                queryClient.invalidateQueries({queryKey: ['userPosts']})
                queryClient.invalidateQueries({queryKey: ['allPosts']})
                queryClient.invalidateQueries({queryKey: ['followingPosts']})
                queryClient.invalidateQueries({queryKey: ['notifications']})
                queryClient.invalidateQueries({queryKey: ['communityPosts']})



                return data

            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })
    
    const {mutate: commentMutate, isPending: isPendingComment} = useMutation({
        mutationFn: async () => {
            try{
                const res = await fetch(`/api/posts/comment/${_id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({text: comment})
                })

                const data = await res.json()
                if(data.error) throw new Error(data.error)
                
                
                console.log("POST_COMMENT: ", data)

                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                queryClient.invalidateQueries({queryKey: ['userPosts']})
                queryClient.invalidateQueries({queryKey: ['allPosts']})
                queryClient.invalidateQueries({queryKey: ['followingPosts']})
                queryClient.invalidateQueries({queryKey: ['communityPosts']})

                setComment("")
                return data

            }catch(error){
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })


    const { mutate: mutateDeletePost} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/${_id}`, {
                    method: 'DELETE'
                })
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("POST_DELETE: ", data)
                toast.success(data.message)
                queryClient.invalidateQueries({queryKey: ['authUser']})
                queryClient.invalidateQueries({queryKey: ['userProfile']})
                queryClient.invalidateQueries({queryKey: ['userPosts']})
                queryClient.invalidateQueries({queryKey: ['allPosts']})
                queryClient.invalidateQueries({queryKey: ['followingPosts']})
                queryClient.invalidateQueries({queryKey: ['communityPosts']})
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    const { mutate: mutateRepost, isPending: isPendingRepost} = useMutation({
        mutationFn: async () => {
            try {
                if(!selectedRepostUser) throw new Error("Select user")
                const res = await fetch(`/api/posts/repost/${_id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: selectedRepostUser})
                })

                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("REPOST_SHARE: ", data)
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        },
        onSuccess: () => {
            setSelectedRepostUser('')
            document.getElementById('my_modal_repost').close()
            toast.success("Post shared")
        }
    })

    const handleLike = () => {
        mutate()
    }

    const handleComment = (e) => {
        e.preventDefault()
        commentMutate()
        // setComment("")
    }


    const renderedComments = comments?.map(comment => <SingleComment {...comment} key={comment?._id}/>)
    const renderedRepostUsers = authUser.following.map(user => <SingleRepostUser selectedRepostUser={selectedRepostUser} setSelectedRepostUser={setSelectedRepostUser} key={user._id} {...user}/>)

    return (
        <div className='bg-[rgb(28,28,37)] mt-6 rounded-xl'>
            <div className='flex items-center gap-4 p-6 pb-0'>
                <div onClick={() => navigate(community ? `/communities/${community.name}` : `/profile/${user.username}`)} className="avatar cursor-pointer">
                    <div className={`w-16 ${community ? " rounded-xl" : "rounded-full"} bg-[rgb(40,41,50)]`}>
                        <img src={community ? community.profileImg : user.profileImg} onLoad={() => setAvatarLoading(false)} className={`${avatarLoading ? "opacity-0" : "opacity-[1]"}`}/>
                    </div>
                </div>
                <div onClick={() => navigate(community ? `/communities/${community.name}` : `/profile/${user.username}`)} className='cursor-pointer'>
                    <p className='text-slate-300'>{community ? community.name : user.fullname}</p>
                    <p className='text-sm text-slate-400'>{(new Date(createdAt).toLocaleDateString())}</p>
                </div>
                <div className="dropdown ml-auto dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 bg-[rgb(28,28,37)] border-none hover:bg-[rgb(50,50,61)]">
                        <IoIosMenu size={24} className='ml-auto text-slate-400'/>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu  rounded-box z-[1000] w-52 p-2 shadow bg-[rgb(40,41,50)]">
                        <li onClick={mutateDeletePost}><a>Delete post</a></li>
                    </ul>
                </div>
            </div>
            <p className='mt-6  text-slate-500 px-6 open-sans-my'>{text}</p>
            
            {
                img ? 
                <div className='w-[95%] mx-auto relative max-h-[500px] overflow-hidden flex items-center justify-center mt-4 rounded-xl'>
                    <img onLoad={() => setImageLoading(false)} src={img} className={`${imageLoading ? "opacity-0" : "opacity-[1]"} w-full blur-2xl opacity-30`}/>
                    <img src={img} className='max-h-[500px] mx-auto max-w-[95%] block top-[50%] translate-y-[-50%]  absolute mb-8'/>
                </div>
                : 
                ""
            }

            {/* <div className='divider my-0 px-6 mt-6'></div>   */}


            {/* BOTTOM POST MENU */}
            <div className='flex items-center w-full px-6 justify-start gap-4 mt-6 pb-6'>
                <button onClick={() => setShowComments(prev => !prev)} className='flex items-center gap-2 text-slate-500 bg-[rgb(40,41,50)] w-[80px] h-[40px] justify-center rounded-xl'>
                    <FaRegComment size={23}/>
                    <p>{comments.length}</p>
                </button>
                <button disabled={isPendingLike} onClick={handleLike} className='flex items-center gap-2 text-slate-500 bg-[rgb(40,41,50)] w-[60px] h-[40px] justify-center rounded-xl'>
                    {
                        isPendingLike ?
                        <span className="loading loading-ring loading-sm"></span>
                        :
                        authUser.likedPosts.includes(_id.toString()) ?
                        <FaHeart  className='text-red-600 cursor-pointer'/>
                        :
                        <FaRegHeart  className={`hover:text-slate-300 cursor-pointer`}/>
                    }
                    <p>{likes.length}</p>
                </button>
                <button onClick={()=>document.getElementById('my_modal_repost').showModal()} className='flex items-center gap-2 text-slate-500 bg-[rgb(40,41,50)] w-[60px] h-[40px] justify-center rounded-xl'>
                    <LuShare2 size={19}/>
                </button>
            </div>
            {
                showComments ?
                <div className='divider mt-0'></div>
                :
                ""
            }


            {
                showComments ? 
                renderedComments
                :
                ""
            }

            {/* COMMENT INPUT */}
            <div className={`${showComments ? "flex" : "hidden"} items-center w-full gap-2 px-6 pb-4`}>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={authUser.profileImg} />
                    </div>
                </div>
                <form onSubmit={handleComment} className="input flex-grow input-bordered flex items-center gap-2 text-slate-300 bg-[rgb(40,41,50)] focus-within:outline-none border-none">
                    <input value={comment} onChange={e => setComment(e.target.value)} type="text" className="grow focus:border-none focus:outline-none" placeholder="Write your comment..." />
                    {
                        isPendingComment?
                        <span className="loading loading-spinner loading-md"></span>
                        :
                        <button disabled={isPendingComment} type='submit'><IoSendOutline className='text-slate-400' size={20}/></button>
                    }
                </form>
            </div>



            {/* MODAL WINDOW REPOST */}
            <dialog id="my_modal_repost" className="modal">
                <div className="modal-box bg-[rgb(28,28,37)] text-slate-300 !w-[1000px]">
                    <h3 className="font-bold text-lg">Share post with following users</h3>
                    <div className='flex items-center justify-center flex-wrap mt-8 gap-4 max-h-[500px] overflow-y-auto'>
                        { renderedRepostUsers }
                    </div>
                    <div className='flex items-center justify-center gap-4 mt-4'>
                        <button onClick={mutateRepost} disabled={!selectedRepostUser || isPendingRepost} className='bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed text-white block w-[120px] h-[40px] rounded-xl'>
                            {
                                isPendingRepost?
                                <span className="loading loading-ring loading-md"></span>
                                :
                                "Share"
                            }
                        </button>
                        <button onClick={()=>document.getElementById('my_modal_repost').close()} className='bg-[rgb(40,41,50)] text-white block w-[120px] h-[40px] rounded-xl'>Close</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default SinglePost