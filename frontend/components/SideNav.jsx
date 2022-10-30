import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import SideNavDropDownItem from './SideNavDropDownItem'

const SideNavItem = ({image, path, title, contrast, w, h}) => {
  return (
    <Link href={`/dashboard${path}`} >
      <button className={`${contrast?"bg-blackContrast":"bg-blackPrimary hover:bg-blackDark"}  pl-[24px] w-full h-[48px] flex flex-row items-center `}>
        <div className='flex flex-row h-[16px] gap-[12px] justify-start  '>
          <div className='w-[14px] h-[14px]'>
          <Image src={image} alt="dashboard nav item" width={w?w:14} height={h?h:14} />          
          </div>
          <span className='text-[15px] leading-[20px] '>{title}</span>
        </div>
      </button>
    </Link>
  )
}

const subItems = [{title: "Medicines", path: "/dashboard/products"},{title: "Categories", path: "/dashboard/categories"}]

const SideNav = () => {
  return (
    <div className='w-1/5 bg-blackPrimary h-[100vh] text-white ' >
        <div className='w-full h-[60px] bg-blackDark flex flex-row gap-[16px] pl-[24px] items-center '>
            <div>
                <Image src="/assets/logo_pharmacy.png" alt="pharmacy tu salud" width="42" height="42" />
            </div>
            <h4 className='leading-[20px] text-[18px] font-semibold '>Pharma Tu Salud</h4>
        </div>

        <div className='layout '>
          <div className='user-info w-full h-[102px] pl-[25px] flex flex-row justify-start items-center '>
            <div className='rounded-sm w-[42px] h-[42px] '>
              <Image src="/assets/userpic.png" alt="pharmacy tu salud" width="42" height="42" />              
            </div>
            <div className='ml-4 flex-1 max-w-[138px]'>
              <p className='text-[14px] leading-[21px] font-medium '>Ronald Garcia</p>
              <p className='text-[11px] text-yellow font-normal' >Administrator</p>
            </div>
            <div className='w-[8px] h-[18px]' >
              <button type='button'>
                <Image src="/assets/three_dots.png" alt="three dots" width="4" height="18" />
              </button>
            </div>
          </div>

          <div className='pages'>
            <SideNavItem image={"/assets/icons/dashboard.png"} title={"Dashboard"} contrast={true} w={14} h={14} />
            <SideNavDropDownItem image={"/assets/icons/products.png"} title={"Inventary"} subitems={subItems}/>            
            {/* <SideNavItem image={"/assets/icons/products.png"} title={"Products"} w={14} h={14} /> */}
            {/* <SideNavItem image={"/assets/icons/dashboard.png"} title={"Inputs"} />
            <SideNavItem image={"/assets/icons/dashboard.png"} title={"Outputs"} /> */}
            <SideNavItem image={"/assets/icons/dashboard.png"} path={"/batchs"} title={"Batchs"} w={14} h={14} />
            <SideNavItem image={"/assets/icons/packing-24.png"} path={"/inputs"} title={"Inputs"} w={18} h={18} />
            <SideNavItem image={"/assets/icons/unpacking-24.png"} path={"/outputs"} title={"Outputs"} w={18} h={18} />
            <SideNavItem image={"/assets/icons/users.png"} path={"/users"} title={"Users management"}
            w={14} h={9.8} />
            <SideNavItem image={"/assets/icons/reports.png"} path={"/reports"}  title={"Reports"}
            w={14} h={7.64}/>
            <SideNavItem image={"/assets/icons/alert.png"} path={"/alerts"}  title={"Alerts"} w={12} h={14} />
            <SideNavItem image={"/assets/icons/configuration.png"} path={"/settings"}  title={"Configuration"} />

          </div>
        </div>

    </div>
  )
}


export default SideNav