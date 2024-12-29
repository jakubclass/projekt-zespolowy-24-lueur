import { MdOutlineFormatQuote } from "react-icons/md";
import { SlPresent } from "react-icons/sl";
import { IoCalendarClearOutline } from "react-icons/io5";
import React from 'react'

const Events = () => {
  return (
    <div className='rounded-xl bg-[rgb(28,28,37)] mt-6 montserrat-my'>
      <p className='text-slate-300 pt-6 pl-6'>Events</p>
      <div className='divider'></div>

      <div className='flex items-center gap-4 ml-6 text-slate-400'>
        <IoCalendarClearOutline size={24}/>
        <p>10 Events Invites</p>
      </div>

      <div className='flex items-center gap-4 ml-6 text-slate-400 mt-4 pb-6'>
        <SlPresent size={24}/>
        <p>
          <MdOutlineFormatQuote size={15} className="inline rotate-180"/>
          Pradas Invitaion Birthday
          <MdOutlineFormatQuote size={15} className="inline ml-1"/>
          
        </p>
      </div>

    </div>
  )
}

export default Events