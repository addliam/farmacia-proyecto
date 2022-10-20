import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper'
import Products from '../../components/dashboard/Products'
import axios from "axios"

const URL_API = 'http://localhost:5000/api/products'

const DashboardProducts = ({data}) => {
  return (
    <DashboardWrapper>
        <Products medicineData={data} />
    </DashboardWrapper>
  )
}

export async function getStaticProps() {
    const result = await axios.get(URL_API)
    const data = result.data;
    return {
      props: {
        data,
      },
    }
  }
  
export default DashboardProducts