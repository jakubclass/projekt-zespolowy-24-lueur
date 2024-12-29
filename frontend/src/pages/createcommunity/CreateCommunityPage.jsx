import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'




const CreateCommunityPage = () => {
    const [coverImg, setCoverImg] = useState(null)
    const coverImgRef = useRef(null)

    const [profileImg, setProfileImg] = useState(null)
    const profileImgRef = useRef(null)

    const [name, setName] = useState()
    const [fullname, setFullname] = useState()
    const [industry, setIndustry] = useState()
    const [type, setType] = useState()
    const [size, setSize] = useState()
    const [headqurters, setHeadqurters] = useState()
    const [location, setLocation] = useState()
    const [about, setAbout] = useState()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleCoverImageChange = e => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () => {
                setCoverImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleProfileImageChange = e => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () => {
                setProfileImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }


    const { mutate: mutateCreateCommunity, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/communities/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name, fullname, industry, type, size, headqurters, location, about, profileImg, coverImg})
                })

                const data = await res.json()
                if(data.error) throw new Error(data.error)
                console.log("CREATE_COMMUNITY: ", data)
                toast.success("Community has been successfully created")
                navigate('/communities')
                queryClient.invalidateQueries({queryKey: ['communities']})
                return data
            } catch (error) {
                toast.error(error.message)
                console.log(error.message)
            }
        }
    })


    return (
        <div className='px-10 pt-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <div className='bg-[rgb(28,28,37)] w-full rounded-xl p-6'>
                <div className='flex items-center justify-center overflow-hidden mx-auto  h-[350px] rounded-xl relative bg-[rgb(40,41,50)]'>
                    {
                        coverImg ?
                        <img className='min-w-full min-h-full' src={coverImg}/>
                        :
                        ""
                    }
                    <button onClick={() => coverImgRef.current.click()} className='absolute text-slate-100 px-6 py-2 bg-blue-500 rounded-xl'>{coverImg ? "Edit" : "Add cover image"}</button>
                    <input type="file" accept="image/*" hidden ref={coverImgRef} onChange={handleCoverImageChange}/>
                </div>


                <div className="flex items-start justify-center gap-20 mt-8">
                    {/*     AVATAR   */}
                    <div className='flex items-center'>
                        <div className="avatar">
                            <div className="w-40 rounded-full bg-[rgb(40,41,50)]">
                                {
                                    profileImg && <img src={profileImg} />
                                }
                            </div>
                        </div>
                        <button onClick={() => profileImgRef.current.click()} className='bg-blue-500 flex items-center justify-center rounded-full h-[60px] w-[60px] ml-[-20px] z-20 hover:bg-blue-600 transition-all duration-150'>
                            <FaPen size={20}/>
                        </button>
                        <input type='file' accept='image/*' hidden onChange={handleProfileImageChange} ref={profileImgRef}/>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>

                        {/*     NAME     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="grow" placeholder="Name" />
                        </label>

                        {/*     FULLANME     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input value={fullname} onChange={e => setFullname(e.target.value)} type="text" className="grow" placeholder="Full name" />
                        </label>

                        {/*     INDUSTRY     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input value={industry} onChange={e => setIndustry(e.target.value)} type="text" className="grow" placeholder="Industry" />
                        </label>

                        {/*     TYPE     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input value={type} onChange={e => setType(e.target.value)} type="text" className="grow" placeholder="Type" />
                        </label>

                        {/*     COMPANY SIZE     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input min={0} value={size} onChange={e => setSize(e.target.value)} type="number" className="grow" placeholder="Company size" />
                        </label>

                        {/*     HEADQURTERS     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input min={0} value={headqurters} onChange={e => setHeadqurters(e.target.value)} type="text" className="grow" placeholder="Headqurters" />
                        </label>

                        {/*     LOCATION     */}
                        <label className="input input-bordered flex items-center gap-2 bg-[rgb(40,41,50)]">
                            <input min={0} value={location} onChange={e => setLocation(e.target.value)} type="text" className="grow" placeholder="Location" />
                        </label>

                        {/*     BIO     */}
                        <label className="form-control col-span-2">
                            <div className="label">
                                <span className="label-text">ABOUT</span>
                            </div>
                            <textarea value={about} onChange={e => setAbout(e.target.value)} className="textarea textarea-bordered h-24 bg-[rgb(40,41,50)]" placeholder="About your community"></textarea>
                        </label>

                    </div>


                </div>

                <button onClick={mutateCreateCommunity} disabled={isPending}  className='bg-blue-600 mx-auto block px-6 py-2 rounded-xl mt-8'>
                    {
                        isPending ?
                        <span class="loading loading-ring loading-sm px-6"></span>
                        :
                        "Create community"
                    }
                </button>


            </div>
        </div>
    )
}

export default CreateCommunityPage