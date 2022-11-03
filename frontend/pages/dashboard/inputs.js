import React from 'react'
import Inputs from '../../components/dashboard/inputs/Inputs'
import DashboardWrapper from '../../components/DashboardWrapper'

import axios from "axios"
import { BASE_URL_API } from '../../components/lib/urlApi'


const DashboardInputs = ({inputsAPIData, productsAPIData}) => {
  return (
    <DashboardWrapper>
      <Inputs inputData={inputsAPIData} productsData={productsAPIData} />
    </DashboardWrapper>
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