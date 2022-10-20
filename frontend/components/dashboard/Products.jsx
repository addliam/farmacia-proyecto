import React from 'react'
import TableProducts from './products/TableProducts'

const Products = ({medicineData}) => {
  return (
    <div className='pt-[30px] px-[40px] h-full bg-whiteGray'>
      <h3 className='text-blackDark text-[24px] font-semibold '>Medicines {`(${medicineData?medicineData.length:'000'})`}</h3>
      <div className='mt-8 flex flex-row justify-center'>
        <TableProducts data={medicineData?medicineData:[]} />
      </div>
    </div>
  )
}

export default Products