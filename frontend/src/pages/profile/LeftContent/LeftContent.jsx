

import React from 'react'
import Progress from './Progress'
import AboutMe from './AboutMe'

const LeftContent = () => {
  return (
    <div className='w-[30%] shrink-0'>
      <Progress />
      <AboutMe />
    </div>
  )
}

export default LeftContent