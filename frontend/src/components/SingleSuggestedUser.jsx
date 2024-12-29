


import React from 'react'
import { Link } from 'react-router-dom'

const SingleSuggestedUser = ({profileImg, username, fullname, followers}) => {
  return (
    <div className="card image-full w-full !p-0">
        <figure>
            <img
            src={profileImg}
            alt={username}
            className=''
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title text-slate-100">{fullname}</h2>
            <p>@{username}</p>
            <p>Followers - {followers.length}</p>
            <div className="card-actions justify-end">
            <Link to={`/profile/${username}`} className="btn btn-primary text-white">Visit Profile</Link>
            </div>
        </div>
    </div>
  )
}

export default SingleSuggestedUser