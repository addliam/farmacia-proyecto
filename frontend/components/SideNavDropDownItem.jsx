import React, {useState} from "react"
import Image from 'next/image'
import Link from "next/link"

const SideNavDropDownItem = ({image, title, w, h, subitems}) => {
    const [toggled, setToggled] = useState(false)
    return (
      <div>
        <button onClick={()=>setToggled((prevState)=>!prevState)} className={`${toggled?'bg-blackDark':''} bg-blackPrimary hover:bg-blackDark"} pl-[24px] w-full h-[48px] flex flex-row items-center relative`}>
          <div className='flex flex-row flex-1 h-[16px] gap-[12px] justify-start '>
            <div className='w-[14px] h-[14px]'>
            <Image src={image} alt="dashboard nav item" width={w?w:14} height={h?h:14} />          
            </div>
            <span className='text-[15px] leading-[20px] text-left w-[180px] '>{title}</span>
            <div className="absolute right-4 ">
                <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>            
          </div>

        </button>
        <div style={toggled?{display: 'block'}:{display: "none"}}>
            {
                subitems.map((subitem,indx)=>(
                    <Link href={subitem.path} key={indx} >
                    <button className={"bg-blackDark hover:bg-blackContrast pl-[24px] w-full h-[48px] flex flex-row items-center "}>
                        <div className='flex flex-row h-[16px] gap-[12px] justify-start   '>
                        <span className='ml-8 text-[15px] leading-[20px] '>{subitem.title}</span>
                        </div>
                    </button>      
                    </Link>
                ))
            }
        </div>
      </div>
    )
}

export default SideNavDropDownItem