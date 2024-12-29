import React from 'react'
import { Link } from "react-router-dom"





const SingleCommunityLeftMenu = ({name, profileImg, followers}) => {
    return (
        <Link to={`/communities/${name}`} className='mt-4 flex items-center gap-2'>
            <div className="avatar">
                <div className="w-10 rounded-xl">
                    <img src={profileImg} />
                </div>
            </div>
            <div>
                <p className='text-sm text-slate-300 tracking-wider'>{name}</p>
                <p className='text-[12px] text-slate-500'>Followers {followers.length}</p>
            </div>
        </Link>
    )
}

export default SingleCommunityLeftMenu