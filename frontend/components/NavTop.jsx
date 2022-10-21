import React from 'react'
import Image from 'next/image'
import DateTimeWidget from './DateTimeWidget'

const NavTop = () => {
  return (
    <div className='w-full h-[60px] border-1 flex flex-row'>
        <div className='parent-container w-full mx-[40px] flex flex-row items-center justify-between '>
            <div className='search flex flex-row w-[440px] h-[38px] '>
                <input className='w-[420px] text-[14px] h-[38px] bg-[#E3EBF3] rounded-l px-3 focus:outline-none ' type="text" name="tip" id="tip" placeholder='Search anything here' />
                <button className='px-4 py-2 bg-[#d5dbe1] rounded-r hover:bg-[#c3c9ce] '>
                    <Image src="/assets/icons/search.png" width={14} height={14} />
                </button>
            </div>
            <DateTimeWidget />
        </div>
    </div>
  )
}

export default NavTop