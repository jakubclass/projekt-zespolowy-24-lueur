
import { GoPlus } from "react-icons/go";

import React from 'react'
import SingleStory from "../../../components/SingleStory";

const Stories = () => {
  return (
    <div className='bg-[rgb(28,28,37)] rounded-xl'>
        <p className='text-slate-300 pt-6 pl-6'>Popular Stories</p>
        <div className='divider'></div>

        {/* CREATE YOUR STORY */}
        <div className='flex items-center gap-4 ml-6'>
            <div className='flex items-center justify-center w-12 h-12 bg-white rounded-full text-blue-600 border-[1px] border-blue-600'>
                <GoPlus size={32}/>
            </div>
            <div>
                <p className="text-slate-300">Create Your Story</p>
                <p className="text-[12px] text-slate-500">Click button beside to create your own.</p>
            </div>
        </div>


        {/* ALL STORIES */}
        <div className="flex flex-col gap-6 mb-6 mt-4">
            <SingleStory avatar={"https://i.pinimg.com/736x/76/29/9c/76299c72300317b52465b598f751bada.jpg"} name="Russel Hicks"/>
            <SingleStory avatar={"https://i.pinimg.com/564x/35/39/c6/3539c6b59e1e98160567e0c261b87224.jpg"} name={"Lettie Christen"}/>
            <SingleStory avatar={"https://i.pinimg.com/564x/53/7d/f1/537df1646e9bed53159d606eaeb7adc3.jpg"} name={"Minnie Armstrong"}/>
            <SingleStory avatar={"https://i.pinimg.com/564x/4e/21/ae/4e21ae92c6b41e5e7871631a5d505689.jpg"} name={"Pan Feng Shui"}/>
        </div>


        {/* BUTTON SEE ALL */}
        <button className="uppercase text-center w-full py-4 bg-[rgb(39,40,49)] rounded-b-xl text-sm montserrat-my tracking-widest text-slate-300">see all</button>
    </div>
  )
}

export default Stories