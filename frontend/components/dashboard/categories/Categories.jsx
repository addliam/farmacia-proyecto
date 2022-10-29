import React from 'react'
import TableCategories from './TableCategories'
import Search from '../../Search'
import PageNumberFoot from '../products/PageNumberFoot'

const Categories = ({categories}) => {
  return (
    <div className='pt-[30px] px-[40px] h-full relative bg-whiteGray '>
      <div className='flex flex-row justify-between'>
        <div className='page-title'>
          <h3 className='text-blackDark text-[24px] font-bold '>
          <span className="text-[#1D242E80] text-[24px] font-semibold ">
          {"Inventory > "} 
          </span>
          Categories {`(${categories?categories.length:'000'})`}
          </h3>
          <span className='text-[14px] font-normal leading-[21px] text-blackDark '>List of medicines groups</span>
        </div>
        <div className='addproduct'>
          <button className='bg-orange text-white rounded-md flex flex-row h-[46px] w-fit items-center px-[18px] '>
            <span className='text-2xl '>+</span>
            <span className='text-[15px] ml-[10px] '>Add new category</span>
          </button>
        </div>
      </div>
      <div className='search_and_filter mt-4 flex flex-row justify-between '>
        <Search placeholder={'Search medicine category'} />
      </div>
      <div className='mt-8 flex flex-row justify-center'>
        <TableCategories data={categories?categories:[]} />
      </div>
      <div className='mt-10 absolute w-11/12 bottom-2'>
        <PageNumberFoot />
      </div>
    </div>
  )
}

export default Categories