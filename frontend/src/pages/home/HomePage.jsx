

import React from 'react'
import LeftContent from './LeftContent/LeftContent'
import RightContent from './RightContent/RightContent'

const HomePage = () => {
  return (
    <div className='p-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
      <div className='w-full flex gap-10'>
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}

export default HomePage