


import React from 'react'
import MiniProfile from './MiniProfile'
import Menu from './Menu'
import PagesYouLike from './PagesYouLike'

const LeftSideBar = () => {
  return (
    <div className='w-[340px] border-r-[1px] border-slate-800 bg-[rgb(28,28,37)] h-[100vh] mt-[-1px] px-12'>
      <MiniProfile />
      <Menu />
      <PagesYouLike />
    </div>
  )
}

export default LeftSideBar