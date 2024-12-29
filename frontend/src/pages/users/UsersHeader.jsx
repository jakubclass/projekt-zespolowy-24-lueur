import React from 'react'
import { CiSearch } from 'react-icons/ci'





const UsersHeader = ({isLoading, searchQuery, setSearchQuery}) => {
    return (
        <div className='flex w-full justify-between items-baseline'>
                <p className='font-bold text-3xl tracking-widest raleway-my'>Discover new friends</p>
                <div className="input w-[400px] input-bordered flex items-center gap-2 focus-within:outline-none border-none bg-[rgb(28,28,37)] text-slate-300">
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}  disabled={isLoading} type="text" className="grow" placeholder={"Search For Anyone"} />
                    <CiSearch className='text-slate-500' size={20} />
                </div>
        </div>
    )
}

export default UsersHeader