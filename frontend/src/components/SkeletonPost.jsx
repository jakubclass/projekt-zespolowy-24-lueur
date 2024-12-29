

import React from 'react'

const SkeletonPost = () => {
  return (
    <div className='w-full bg-[rgb(28,28,37)] rounded-xl p-6 mt-6'>
                <div className='flex items-center gap-4'>
                    <div className='skeleton w-16 h-16 rounded-full'></div>
                    <div>
                        <div className='skeleton w-40 rounded-xl h-6'></div>
                        <div className='skeleton w-24 rounded-xl h-4 mt-2'></div>
                    </div>
                </div>
                <div className='skeleton w-full h-36 mt-8 rounded-xl'></div>
                <div className='skeleton mt-4 w-1/2 h-12 rounded-xl'></div>
            </div>
  )
}

export default SkeletonPost