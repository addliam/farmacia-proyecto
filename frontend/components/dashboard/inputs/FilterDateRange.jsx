import React, {useState,forwardRef} from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const FilterDateRange = ({handleFromDateChange, handleToDateChange, valuef, valuet, handleClickApplyFilter}) => {

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="text-[14px] h-[36px] bg-[#E3EBF3] rounded-l px-3  focus:outline-2 hover:bg-[#d2d7dd] " onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className='flex flex-col'>
      <div className='h-min '>
        <span className='text-[14px] font-semibold '>
          Filter by date range: 
        </span>
      </div>
      <div className='flex flex-row gap-4 z-50 max-w-[200px] place-items-end  '>
        <div className='from'>
          <span className='text-[12px] '>From:</span>
          <DatePicker selected={valuef} onChange={handleFromDateChange} customInput={<CustomInput />} />
        </div>
        <div className='to'>
          <span className='text-[12px] '>To:</span>
          <DatePicker selected={valuet} onChange={handleToDateChange} customInput={<CustomInput />} />
        </div>
        <div className='button-date-range mb-[2px] '>
          <button onClick={()=>handleClickApplyFilter()} className='bg-orange hover:bg-orangeContrast text-sm text-white rounded-md flex flex-row h-[32px] w-fit items-center px-4 '>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterDateRange