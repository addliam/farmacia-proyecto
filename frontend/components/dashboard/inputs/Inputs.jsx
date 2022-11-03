import React, {useState} from 'react'
import TableInputs from './TableInputs';
import InputsSearch from './InputsSearch';
import FilterDateRange from './FilterDateRange';

const InputsHeader =  ({inputAllData, DateRangeComponent }) => {
  const inputDataLength = inputAllData?inputAllData.length:0;
  return (
  <div className='flex flex-row justify-between '>
    <div className='page-title'>
      <h3 className='text-blackDark text-[22px] font-bold '>
      Inputs {`(${inputDataLength>0?inputDataLength:'000'})`}
      </h3>
      <span className='text-[13px] font-normal leading-[21px] text-blackDark '>Inputs of batchs from medicine products</span>
    </div>
    <div className='w-fit max-h-[60px] pt-5 '>
      { DateRangeComponent?<FilterDateRange />:'' }
    </div>
    <div className='addproduct'>
      <button onClick={()=>handleClick()} className='bg-orange hover:bg-orangeContrast text-white rounded-md flex flex-row h-[46px] w-fit items-center px-4 '>
        <span className='text-2xl'>+</span>
        <span className='text-[15px] ml-2'>Add new input</span>
      </button>
    </div>
  </div>    
  )
}

const Inputs = ({inputData, productsData}) => {
  const [currentInputData, setcurrentInputData] = useState(inputData);
  const productNameList = productsData.map((prod)=>prod.name);
  // TODO: bind filterProductName w vale on inputSearch

  const inputSearchHandler = () => {
    console.log("inputSearchHandler");
  }
  return (
    <div className='pt-[16px] px-[40px] h-full relative bg-whiteGray'>
      <InputsHeader inputAllData={inputData} DateRangeComponent={<FilterDateRange />}  />
      <div className='filters-input flex flex-row  gap-6 z-50 my-0 '>
        <div className='mt-2'>
          <InputsSearch productsNameList={productNameList} inputSearchHandler={inputSearchHandler}
          placeholder={"Search by product name"} />          
        </div>
        {/* <div className=' '>
          <FilterDateRange />
        </div> */}
      </div>
      <div className='max-h-[430px] z-0 pt-6 table-wrapper overflow-y-auto '>
        <TableInputs data={currentInputData} />
      </div>      
    </div>    
  )
}

export default Inputs