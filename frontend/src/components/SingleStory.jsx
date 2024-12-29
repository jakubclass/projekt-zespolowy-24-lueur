


import React from 'react'

const SingleStory = ({avatar, name}) => {
  return (
    <div className='flex items-center gap-4 ml-6 '>
        <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                <img src={avatar} />
            </div>
        </div>
        <div>
                <p className="text-slate-300">{name}</p>
                <p className="text-[12px] text-slate-500">12 April at 09.28 PM</p>
            </div>
    </div>
  )
}

export default SingleStory