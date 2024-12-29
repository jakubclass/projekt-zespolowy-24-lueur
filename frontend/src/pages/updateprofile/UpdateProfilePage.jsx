import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { json, useNavigate, useParams } from 'react-router-dom'
import { FaPen } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";



const UpdateProfilePage = () => {
    const { username } = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const coverImgRef = useRef(null)
    const [ coverImg, setCoverImg ] = useState(null)
    const profileImgRef = useRef(null)
    const [profileImg, setProfileImg] = useState(null)
    const [userName, setUserName] = useState("")
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [link, setLink] = useState("")
    const [bio, setBio] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const {data: authUser, isLoading: authUserIsLoading, isError: authUserIsError } = useQuery({queryKey: ['authUser']})

    const { mutate: mutateUpdateUser, isPending } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/users/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({coverImg, profileImg, username: userName, fullname, email, link, bio, currentPassword, newPassword})
                })

                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("UPDATED_USER: ", data)
                queryClient.invalidateQueries({queryKey: ['authUser']})
                toast.success("User has been successfully updated")
                return data
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }
    })

    if(authUserIsLoading){
        return <h2>Loading</h2>
    }

    if(authUser.username !== username){
        return navigate('/')
    }

    useEffect(() => {
        if(!authUserIsLoading && !authUserIsError && authUser){
            setUserName(authUser.username)
            setFullname(authUser.fullname)
            setEmail(authUser.email)
            setLink(authUser.link)
            setBio(authUser.bio)
        }
    }, [authUserIsLoading])


    const handleCoverImageChange = e => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () => {
                setCoverImg(reader.result)
            };
            reader.readAsDataURL(file)
        }
    }

    const handleProfileImageChange = e => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () => {
                setProfileImg(reader.result)
            };
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <div className='bg-[rgb(28,28,37)] w-full rounded-xl p-6'>
                <div className='flex items-center justify-center overflow-hidden mx-auto  h-[350px] rounded-xl relative'>
                    <img className='min-w-full min-h-full' alt='coverimg' src={coverImg || authUser.coverImg}/>
                    <button onClick={() => coverImgRef.current.click()} className='absolute text-slate-100 px-6 py-2 bg-blue-500 rounded-xl'>Edit</button>
                    <input type="file" accept="image/*" hidden ref={coverImgRef} onChange={handleCoverImageChange}/>
                </div>

                <div className="flex items-start justify-center gap-20 mt-8">
                    {/*     AVATAR   */}
                    <div className='flex items-center'>
                        <div className="avatar">
                            <div className="w-40 rounded-full">
                                <img src={profileImg ? profileImg : authUser.profileImg} />
                            </div>
                        </div>
                        <button onClick={() => profileImgRef.current.click()} className='bg-blue-500 flex items-center justify-center rounded-full h-[60px] w-[60px] ml-[-20px] z-20 hover:bg-blue-600 transition-all duration-150'>
                            <FaPen size={20}/>
                        </button>
                        <input type='file' accept='image/*' hidden onChange={handleProfileImageChange} ref={profileImgRef}/>
                    </div>


                    <div className='grid grid-cols-2 gap-4'>
                        {/*     USERNAME     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <MdOutlineAlternateEmail />
                            <input value={userName} onChange={e => setUserName(e.target.value)} type="text" className="grow" placeholder="username" />
                        </label>

                        {/*     FULLNAME     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <FaRegUser />
                            <input value={fullname} onChange={e => setFullname(e.target.value)} type="text" className="grow" placeholder="Full name" />
                        </label>

                        {/*     EMAIL     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <MdOutlineMail />
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="grow" placeholder="Email" />
                        </label>

                        {/*     LINK     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <FaLink />
                            <input value={link} onChange={e => setLink(e.target.value)} type="text" className="grow" placeholder="Link" />
                        </label>

                        {/*     BIO     */}
                        <label className="form-control col-span-2">
                            <div className="label">
                                <span className="label-text">BIO</span>
                            </div>
                            <textarea value={bio} onChange={e => setBio(e.target.value)} className="textarea textarea-bordered h-24 bg-[rgb(40,41,50)]" placeholder="Bio"></textarea>
                        </label>


                        {/*     CURRENT PASSWORD     */}
                        <span className="label-text col-span-2">CHANGE PASSWORD</span>

                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)] mt-[-5px]">
                            <MdOutlineLock />
                            <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type="password" className="grow" placeholder="Current password" />
                        </label>

                        {/*     NEW PASSWORD     */}

                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)] mt-[-5px]">
                            <MdOutlineLock />
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" className="grow" placeholder="New password" />
                        </label>


                    </div>
                    
                </div>

                <button disabled={isPending} onClick={mutateUpdateUser} className='bg-blue-600 mx-auto block px-6 py-2 rounded-xl mt-8'>SAVE CHANGES</button>
            </div>
            

        </div>
    )
}

export default UpdateProfilePage