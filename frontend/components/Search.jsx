import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'


const Search = ({placeholder,buttonHandler, triggerOnBlankField}) => {
  const [value, setValue] = useState('')
  const myPressEnterRef = useRef(null)

  useEffect(() => {
    if (value === ""){
      triggerOnBlankField?triggerOnBlankField():'';
    }
    return () => {
    }
  }, [value])
  
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      myPressEnterRef.current.click()
    }
  }

  return (
    <div className='search flex flex-row w-[340px] h-[38px] '>
        <input onKeyDown={_handleKeyDown} value={value} onChange={(e)=>setValue(e.target.value)} className='w-[420px] text-[14px] h-[38px] bg-[#E3EBF3] rounded-l px-3  focus:outline-2 focus:outline-[#d2d7dd] ' type="text" name="tip" id="tip" placeholder={placeholder} />
        <button ref={myPressEnterRef} type='submit' onClick={()=>buttonHandler(value)} className='px-4 py-2 rounded-r bg-[#E3EBF3]'>
            <Image src="/assets/icons/search.png" width={18} height={18} />
        </button>
        {/* TODO add handler and funcionality */}
    </div>
  )
}

export default Search