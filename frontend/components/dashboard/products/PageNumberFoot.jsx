import React from 'react'

const Arrow = ({active, left}) => {
    return (
    <div>
    {
        active ? (
            <button className='w-6 h-6 bg-white border-[0.4px] border-blackDark rounded-md'>
            <span className='text-blackDark '>{left?'<':'>'}</span>            
            </button>                
        ) : (
            <button disabled className='w-6 h-6 bg-white border-[0.4px] border-[#1D242E4D] rounded-md'>
            <span className='text-[#1D242E4D] '>{left?'<':'>'}</span>            
            </button>                
        )
    }
    </div>
    )
}

const PageNumberFoot = () => {
  return (
    <div className='flex-1 flex flex-row justify-between w-full h-max'>
    <div>
      <span className='text-blackDark text-[12px] '>Showing 1 - 3 results of 153 </span>
    </div>
    <div className='flex flex-row'>
        <Arrow left={true}/>
        <div className='mx-2'>
            <span className='text-blackDark text-sm '>Page 01</span>
        </div>
        <Arrow active={true}  />
    </div>
  </div>    
  )
}

export default PageNumberFoot