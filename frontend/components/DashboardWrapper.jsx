import React from 'react'
import SideNav from '../components/SideNav'
import NavTop from '../components/NavTop'

const DashboardWrapper = ({children}) => {
  return (
    <div className='h-[100vh] w-[100vw] flex flex-row gap-0  '>
      <SideNav />
      <div className='flex w-4/5 flex-col'>
        <NavTop /> 
        {children}        
      </div>
    </div>
  )
}

export default DashboardWrapper