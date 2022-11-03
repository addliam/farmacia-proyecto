import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'

const InputsSearch = ({placeholder, productsNameList, triggerOnBlankField, inputSearchHandler}) => {
  const [value, setValue] = useState('')
  const [similarNames, setSimilarNames] = useState(productsNameList)  
  const [showListSuggestions, setShowListSuggestions] = useState(false)
  const [selectedIndexOfList, setSelectedIndexOfList] = useState(-1)
  const inputRef = useRef(null)

  const productsNameLength = similarNames?.length
  const lastIndexProductsName = productsNameLength -1

  const ClassName1 = `py-2 text-white text-sm px-2 border-b-[1px] border-gray bg-[#5A90DB] z-50`
  const ClassName2 = `py-2 text-sm px-2 border-b-[1px] border-gray z-50`

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

//   const handleFocusInput = () => {
//     setShowListSuggestions(true)
//   }

  const handleClickOnItemsListName = (v) => { inputSearchHandler(v) }

    useEffect(() => {
        setSelectedIndexOfList(-1)
        if (value!==''){
            if (document.activeElement === inputRef.current) {
                console.log("Not null and focused");
                setShowListSuggestions(true)
            }
            const lowerCaseValue = value.toLowerCase()
            setSimilarNames(()=>productsNameList.filter((prodName)=>prodName.toLowerCase().startsWith(lowerCaseValue) ))
        }else{
            // reset to initial value
            // triggerOnBlankField()
            // setShowListSuggestions(false)
            // setSimilarNames(productsNameList)
        }
        return () => {
        }
    }, [value])


    useEffect(() => {
        const offset = 12
        const heightSizePixels = 37
        if (selectedIndexOfList >= offset){
            ulRef.current?.scroll(0,heightSizePixels*(selectedIndexOfList - offset))
        }

    return () => {
    }
    }, [selectedIndexOfList])

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        const selectedElement = selectedIndexOfList!==-1?similarNames[selectedIndexOfList]:0
        console.log(`HandleKeyDown - BatchSearch.jsx`);
        inputSearchHandler(selectedElement)
        setShowListSuggestions(false)
        setValue(selectedElement)
        inputRef.current.blur()
    }
    if (e.keyCode === 38){
        setSelectedIndexOfList((prev)=>prev===0?prev:prev-1)
    }
    if (e.keyCode === 40){
        setSelectedIndexOfList((prev)=>prev===lastIndexProductsName?prev:prev+1)
    }
  }

  return (
    <div className='search flex flex-row w-[340px] z-50 h-[36px] '>
        <div className='z-50'>
            <input autoComplete='off' ref={inputRef} onKeyDown={_handleKeyDown} value={value} onChange={handleInputChange} className='w-fit text-[14px] h-[36px] bg-[#E3EBF3] rounded-l px-3  focus:outline-2 focus:outline-[#d2d7dd] ' type="text" name="tip" id="tip" placeholder={placeholder} />
            {
                showListSuggestions?(
                <div className='bg-white rounded-b-md z-50 '>
                    <ul className='max-h-[480px] overflow-x-auto z-50 '>
                        {
                            similarNames.map((i, indx)=>{
                                let CustomClassName = (selectedIndexOfList!==-1 && (selectedIndexOfList===indx)) ? ClassName1 : ClassName2 
                                return (
                                    <li key={indx} onClick={()=>handleClickOnItemsListName(similarNames[indx])} className={CustomClassName} >{similarNames[indx]}</li>
                                )
                            }
                            )
                        }
                    </ul>
                </div>                    
                ):(<></>)
            }

        </div>
        <div>
            <button type='submit' onClick={()=>console.log("button pressed")} className='px-4 py-2 rounded-r bg-[#E3EBF3] hover:bg-[#BCC2C8] h-[36px] '>
                <Image src="/assets/icons/search.png" width={18} height={18} />
            </button>
        </div>
    </div>
  )
}

export default InputsSearch