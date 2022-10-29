import React from 'react'
import DashboardWrapper from '../../components/DashboardWrapper'
import Categories from '../../components/dashboard/categories/Categories'
import axios from "axios"

const BASE_URL_API = 'http://localhost:5000/api'

const DashboardCategories = ({dataCategories}) => {
  return (
    <DashboardWrapper>
        <Categories categories={dataCategories} />
    </DashboardWrapper>
  )
}

export async function getStaticProps() {
    const resultCategories = await axios.get(BASE_URL_API+"/categories")
    const dataCategories = resultCategories.data;
    return {
      props: {
        dataCategories,
      },
    }
  }
  
export default DashboardCategories