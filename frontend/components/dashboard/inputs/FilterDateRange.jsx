import React, {useState,forwardRef} from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const FilterDateRange = () => {
  const dateMinus2Days = new Date()
  dateMinus2Days.setDate(dateMinus2Days.getDate() - 5)

  const [fromDate, setFromDate] = useState(dateMinus2Days)
  const [toDate, setToDate] = useState(new Date())

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
      <div className='flex flex-row gap-4 z-50 max-w-[200px] '>
        <div className='from'>
          <span className='text-[12px] '>From:</span>
          <DatePicker selected={fromDate} onChange={(d)=>setFromDate(d)} customInput={<CustomInput />} />
        </div>
        <div className='to'>
          <span className='text-[12px] '>To:</span>
          <DatePicker selected={toDate} onChange={(d)=>setFromDate(d)} customInput={<CustomInput />} />
        </div>
      </div>
    </div>
  )
}

export default FilterDateRange