import React from 'react'
import Batchs from '../../components/dashboard/batchs/Batch'
import DashboardWrapper from '../../components/DashboardWrapper'
import axios from "axios"

import { BASE_URL_API } from '../../components/lib/urlApi'

const DashboardBatchs = ({batchAPIData}) => {
  return (
    <DashboardWrapper>
      <Batchs batchData={batchAPIData} />
    </DashboardWrapper>
  )
}

export async function getStaticProps() {
  const resultBatches = await axios.get(BASE_URL_API+"/batchs")
  const batchAPIData = resultBatches.data;
  return {
    props: {
      batchAPIData,
    },
  }
}

export default DashboardBatchs