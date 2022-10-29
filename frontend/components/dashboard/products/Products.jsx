import React from 'react'
import TableProducts from './TableProducts'
import Image from 'next/image'
import Search from '../../Search'
import PageNumberFoot from './PageNumberFoot'

const Products = ({medicineData, categories, handleClick}) => {

  return (
    <>
    <div className='pt-[16px] px-[40px] h-full relative bg-whiteGray'>
      <div className='flex flex-row justify-between'>
        <div className='page-title'>
          <h3 className='text-blackDark text-[22px] font-bold '>
          <span className="text-[#1D242E80] text-[22px] font-semibold ">
          {"Inventory > "} 
          </span>
          Medicines {`(${medicineData?medicineData.length:'000'})`}
          </h3>
          <span className='text-[13px] font-normal leading-[21px] text-blackDark '>List of medicines available for sale</span>
        </div>
        <div className='addproduct'>
          <button onClick={()=>handleClick()} className='bg-orange text-white rounded-md flex flex-row h-[46px] w-[162px] items-center  '>
            <span className='text-2xl ml-[18px] '>+</span>
            <span className='text-[15px] ml-[10px] '>Add new item</span>
          </button>
        </div>
      </div>
      <div className='search_and_filter mt-2 flex flex-row justify-between '>
        <Search placeholder={'Search medicine inventary'} />
        <div className='flex flex-row'>
          <div className='w-8 flex flex-row justify-center items-center '>
            <Image src="/assets/icons/filter.svg" width={14} height={14} />
          </div>
          <select name="category" id="category" className='text-blackDark text-[14px] w-[217px] h-[38px] px-4 pr-8'>
            <option value="volvo">- Select Category -</option>
            {
              categories?(
                categories.map((category, indx)=>(
                  <option key={category._id} value={`${category.name}`}>{category.name}</option>
                ))
              ):("")
            }
          </select>
        </div>
      </div>
      <div className='mt-6 flex flex-row justify-center'>
        <TableProducts data={medicineData?medicineData:[]} />
      </div>
      <div className='mt-10 absolute w-11/12 bottom-2'>
        <PageNumberFoot />
      </div>
    </div>
    </> 
  )
}

export default Products