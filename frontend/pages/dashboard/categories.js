import React, {useState} from 'react'
import DashboardWrapper from '../../components/DashboardWrapper'
import Categories from '../../components/dashboard/categories/Categories'
import AddNewCategory from '../../components/dashboard/categories/AddNewCategory'
import axios from "axios"

const BASE_URL_API = 'http://localhost:5000/api'

const DashboardCategories = ({dataCategories}) => {
  const [currentDataCategories, setCurrentDataCategories] = useState(dataCategories);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const refreshCurrentDataCategories = async () => {
    const resultCategories = await axios.get(BASE_URL_API+"/categories")
    const dataCategories = resultCategories.data;  
    setCurrentDataCategories(dataCategories)
  }

  const showForm = () => { setShowAddCategoryForm(true) }
  const closeForm = () => { setShowAddCategoryForm(false) }

  return (
    <>
    {
      showAddCategoryForm?(
      <AddNewCategory handleCloseClick={closeForm} refreshAction={refreshCurrentDataCategories}  />
      ):(<></>)
    }    
    <DashboardWrapper>

        <Categories openFormCategoryHandler={showForm} categories={currentDataCategories} />
    </DashboardWrapper>
    </>    
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