import React from 'react'
import Batchs from '../../components/dashboard/batchs/Batch'
import DashboardWrapper from '../../components/DashboardWrapper'
import axios from "axios"

import { BASE_URL_API } from '../../components/lib/urlApi'

const DashboardBatchs = ({batchAPIData, productsAPIData}) => {
  return (
    <DashboardWrapper>
      <Batchs batchData={batchAPIData} productsData={productsAPIData} />
    </DashboardWrapper>
  )
}

export async function getStaticProps() {
  const resultBatches = await axios.get(BASE_URL_API+"/batchs")
  const batchAPIData = resultBatches.data
  // Product data needed to suggest on search by product name
  const resultProducts = await axios.get(BASE_URL_API+"/products")
  const productsAPIData = resultProducts.data
  return {
    props: {
      batchAPIData,
      productsAPIData,
    },
  }
}

export default DashboardBatchs