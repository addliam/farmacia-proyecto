import React, {useState} from 'react'
import Inputs from '../../components/dashboard/inputs/Inputs'
import DashboardWrapper from '../../components/DashboardWrapper'
import AddNewInput from '../../components/dashboard/inputs/AddNewInput'

import axios from "axios"
import { BASE_URL_API } from '../../components/lib/urlApi'


const DashboardInputs = ({inputsAPIData, productsAPIData}) => {
  const [showAddInputForm, setShowAddInputForm] = useState(false)
  const [updatedInputsApiData, setUpdatedInputsApiData] = useState(inputsAPIData)

  const handlerButtonAddInput = () => {
    setShowAddInputForm(true)
  }
  const handlerCloseButtonAddInput = () => {
    setShowAddInputForm(false)
  }

  const refreshInputs = async () => {
    console.log("Requesting refresh on inputs");
    const resultInputs = await axios.get(BASE_URL_API+"/inputs")
    const inputsResulData = resultInputs.data
    setUpdatedInputsApiData(inputsResulData)
  } 

  const sortedProductsNameListData = productsAPIData.map((prod)=> (
    {
      id: prod._id,
      name: prod.name
    }
    )).sort((a,b) => a.name.localeCompare(b.name) )

  return (
    <>
    {
      showAddInputForm?(
        <AddNewInput handleCloseClick={handlerCloseButtonAddInput} productsNameListData={sortedProductsNameListData}
        refreshAction={refreshInputs} />
      ):(<></>)
    }
      <DashboardWrapper>
        <Inputs inputData={updatedInputsApiData} productsData={productsAPIData} handlerButtonAddInput={handlerButtonAddInput} />
      </DashboardWrapper>
    </>    
  )
}

export async function getStaticProps() {
  const resultInputs = await axios.get(BASE_URL_API+"/inputs")
  const inputsAPIData = resultInputs.data
  // Product data needed to suggest on search by product name
  const resultProducts = await axios.get(BASE_URL_API+"/products")
  const productsAPIData = resultProducts.data
  return {
    props: {
      inputsAPIData,
      productsAPIData,
    },
  }
}

export default DashboardInputs