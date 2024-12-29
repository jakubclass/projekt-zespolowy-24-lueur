import React from 'react'
import Stories from './Stories'
import Events from './Events'
import SuggestedUsers from './SuggestedUsers'





const RightContent = () => {
    return (
        <div className='w-[30%] flex-shrink-0'>
            <Stories />
            <Events />
            <SuggestedUsers />
        </div>
    )
}

export default RightContent