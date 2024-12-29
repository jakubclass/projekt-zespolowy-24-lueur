import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsPeople } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { TbTemplate } from "react-icons/tb";
import { CiImageOn } from "react-icons/ci";
import { PiScroll } from "react-icons/pi";
import { PiBackpackLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";

const Menu = () => {
  return (
    <div className='mt-10 flex flex-col gap-10'>
        <NavLink to={'/'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <TbTemplate  size={30}/>
            <span>News</span>
        </NavLink>
        
        <NavLink to={'/following'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <BsPeople  size={30}/>
            <span>Following</span>
        </NavLink>

        <NavLink to={'/communities'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <PiBackpackLight size={35}/>
            <span>Communities</span>
        </NavLink>
        
        <NavLink to={'/notifications'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <CiCalendar size={35}/>
            <span>Notifications</span>
        </NavLink>

        <NavLink to={'/users'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <CiUser  size={37}/>
            <span>Users</span>
        </NavLink>

        <NavLink to={'/files'} className={"flex items-center gap-6 text-md font-bold montserrat-my text-slate-300"}>
            <PiScroll size={35}/>
            <span>Files</span>
        </NavLink>


    </div>
  )
}

export default Menu