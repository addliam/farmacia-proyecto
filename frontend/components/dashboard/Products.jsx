import React from 'react'
import TableProducts from './products/TableProducts'
import Image from 'next/image'
import Search from '../Search'

const Products = ({medicineData}) => {
  return (
    <div className='pt-[30px] px-[40px] h-full bg-whiteGray'>
      <div className='flex flex-row justify-between'>
        <div className='page-title'>
          <h3 className='text-blackDark text-[24px] font-bold '>
          <span className="text-[#1D242E80] text-[24px] font-semibold ">
          {"Inventory > "} 
          </span>
          Medicines {`(${medicineData?medicineData.length:'000'})`}
          </h3>
          <span className='text-[14px] font-normal leading-[21px] text-blackDark '>List of medicines available for sale</span>
        </div>
        <div className='addproduct'>
          <button className='bg-orange text-white rounded-md flex flex-row h-[46px] w-[162px] items-center  '>
            <span className='text-2xl ml-[18px] '>+</span>
            <span className='text-[15px] ml-[10px] '>Add new item</span>
          </button>
        </div>
      </div>
      <div className='search_and_filter mt-4 flex flex-row justify-between '>
        <Search placeholder={'Search medicine inventary'} />
        <div className='flex flex-row'>
          <div className='w-8 flex flex-row justify-center items-center '>
            <Image src="/assets/icons/filter.svg" width={14} height={14} />
          </div>
          <select name="category" id="category" className='text-blackDark text-[14px] w-[217px] h-[38px] px-4 pr-8'>
            <option value="volvo">- Select Category -</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
      <div className='mt-8 flex flex-row justify-center'>
        <TableProducts data={medicineData?medicineData:[]} />
      </div>
    </div>
  )
}

export default Products