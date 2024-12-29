import React from 'react'
import { CiSearch } from "react-icons/ci";
import { AiFillFunnelPlot } from "react-icons/ai";


const FollowingHeader = ({setSortType, sortType, searchQuery, setSearchQuery}) => {

    const handleClearFilters = () => {
        setSearchQuery("")
        setSortType("default")
    }

    
    return (
        <div className='flex items-center montserrat-my justify-between'>
            <p className='font-bold text-3xl tracking-widest raleway-my'>Following List</p>


            {/* SORT SECTION */}
            <div className='flex items-center gap-6'>

                <div className="input input-bordered flex items-center gap-2 focus-within:outline-none border-none bg-[rgb(28,28,37)] text-slate-300">
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" className="grow" placeholder="Search" />
                    <CiSearch className='text-slate-500' size={20}/>
                </div>

                <select value={sortType} onChange={e => setSortType(e.target.value)} defaultValue={"default"} className="select w-full focus-within:outline-none border-none bg-[rgb(28,28,37)] text-slate-300">
                    <option disabled value={"default"}>Order by:</option>
                    <option value={"alphasc"} >A-Z</option>
                    <option value={"alphdesc"} >Z-A</option>
                    <option value={"folldesc"} >Followers asc</option>
                    <option value={"follasc"} >Followers desc</option>
                </select>

                <button onClick={handleClearFilters} className='bg-[rgb(28,28,37)] text-slate-400 px-4 py-4 rounded-xl'>
                    <AiFillFunnelPlot />
                </button>
            </div>
        </div>
    )
}

export default FollowingHeader