import React from 'react'
import Inputs from '../../components/dashboard/inputs/Inputs'
import DashboardWrapper from '../../components/DashboardWrapper'

import { BASE_URL_API } from '../../components/lib/urlApi'


const DashboardInputs = () => {
  return (
    <DashboardWrapper>
      <Inputs inputData={[]} />
    </DashboardWrapper>
  )
}

export default DashboardInputs