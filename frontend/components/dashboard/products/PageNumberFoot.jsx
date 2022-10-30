import React from 'react'

const Arrow = ({active, left, handler}) => {
    return (
    <div>
    {
        active ? (
            <button onClick={handler} className='w-6 h-6 bg-white border-[0.4px] border-blackDark rounded-md'>
            <span className='text-blackDark '>{left?'<':'>'}</span>            
            </button>                
        ) : (
            <button onClick={handler} disabled className='w-6 h-6 bg-white border-[0.4px] border-[#1D242E4D] rounded-md'>
            <span className='text-[#1D242E4D] '>{left?'<':'>'}</span>            
            </button>                
        )
    }
    </div>
    )
}

const PageNumberFoot = ({pageNumber, total, leftHandler, rightHandler, maxPage}) => {
  return (
    <div className='flex-1 flex flex-row justify-between w-full h-max'>
    <div>
      <span className='text-blackDark text-[12px] '>Showing 1 - {maxPage} results of {total} </span>
    </div>
    <div className='flex flex-row'>
        <Arrow active={pageNumber!==1} left={true} handler={leftHandler} />        
        <div className='mx-2'>
            <span className='text-blackDark text-sm '>Page {pageNumber?pageNumber:1}</span>
        </div>
          <Arrow active={pageNumber!==maxPage} handler={rightHandler} />
    </div>
  </div>    
  )
}

export default PageNumberFoot