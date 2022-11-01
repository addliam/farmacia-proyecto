import React, {useState} from 'react'

import TableBatchs from './TableBatchs';
import BatchSearch from './BatchSearch';

const BatchsHeader =  ({batchData, productsNameData, inputSearchHandler, triggerOnBlankField}) => {
  const batchsDataLength = batchData?batchData.length:0;
  return (
  <div className='flex flex-row justify-between z-10 mb-4'>
    <div className='page-title'>
      <h3 className='text-blackDark text-[22px] font-bold '>
        Batchs {`(${batchsDataLength>0?batchsDataLength:'000'})`}
      </h3>
      <span className='text-[13px] font-normal leading-[21px] text-blackDark '>
        Batchs from medicine products. Created automatically when added input.
      </span>
    </div>
    <div className='searching-field flex flex-row items-center'>
      <BatchSearch inputSearchHandler={inputSearchHandler} productsNameList={productsNameData} placeholder={"Search by product name"} triggerOnBlankField={triggerOnBlankField} />
    </div>
  </div>    
  )
}

const Batchs = ({batchData, productsData}) => {
  const [currentBatchData, setCurrentBatchData] = useState(batchData?batchData:[]);

  const sortedProductsNameData = productsData?productsData.map((prod)=>prod.name).sort():[];

  const filterDataByProductName = (prodName) => {
    console.log("filterDataByProductName")
    console.log(prodName);
    setCurrentBatchData(()=>batchData.filter((batch)=>batch.product.name === prodName))
  }

  const triggerOnBlankField = () => {
    setCurrentBatchData(batchData)
  }

  return (
    <div className='pt-[16px] px-[40px] h-full relative bg-whiteGray'>
      <BatchsHeader inputSearchHandler={filterDataByProductName} batchData={batchData} productsNameData={sortedProductsNameData} triggerOnBlankField={triggerOnBlankField} />
      <div className='max-h-[460px] pt-2 table-wrapper overflow-y-auto '>
      <TableBatchs data={currentBatchData} />
      </div>
    </div>    
  )
}

export default Batchs