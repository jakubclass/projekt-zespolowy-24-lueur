import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from 'react-router-dom';



const CommunitiesHeader = ({searchQuery, setSearchQuery}) => {
    const { isLoading } = useQuery({ queryKey: ['communities']})
    const navigate = useNavigate()
    return (
        <div className='flex items-center montserrat-my justify-between'>
            <p className='font-bold text-3xl tracking-widest raleway-my'>Discover Communities</p>


            {/* SORT SECTION */}
            <div className='flex items-center gap-6'>
                <div className="input w-[400px] input-bordered flex items-center gap-2 focus-within:outline-none border-none bg-[rgb(28,28,37)] text-slate-300">
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" className="grow" placeholder={"Search Communities"} />
                    <CiSearch className='text-slate-500' size={20} />
                </div>

                <button onClick={() => navigate("/communities/create")} disabled={isLoading} className='flex items-center gap-4 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all duration-150'>
                    <FaPlus size={23}/>
                    <span>Create Community</span>
                </button>

            </div>
        </div>
    )
}

export default CommunitiesHeader