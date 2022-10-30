import React, {useState, useEffect} from 'react'
import DashboardWrapper from '../../components/DashboardWrapper'
import Products from '../../components/dashboard/products/Products'
import AddNewProduct from '../../components/dashboard/products/AddNewProduct'
import axios from "axios"

const BASE_URL_API = 'http://localhost:5000/api'

const DashboardProducts = ({dataProducts, dataCategories}) => {
  const [showNewProductoForm, setShowNewProductoForm] = useState(false);
  const [currentDataProducts, setCurrentDataProducts] = useState(dataProducts)

  const handleShowForm = () => {
    setShowNewProductoForm(true)
  }
  const handleHideForm = () => {
    setShowNewProductoForm(false)
  }

  const refreshData = async () => {
    const resultProducts = await axios.get(BASE_URL_API+"/products")
    const dataProducts = resultProducts.data;
    setCurrentDataProducts(dataProducts)    
  }

  const searchFieldHandler = (value) =>{
    const valueLower = value.toLowerCase()
    setCurrentDataProducts((dataProducts)=>dataProducts.filter((prod)=>prod.name.toLowerCase().startsWith(valueLower)))
  }

  const resetDataProductsInitialValue = () => {
    // refreshData() or 
    setCurrentDataProducts(dataProducts)
  }
  
  // useEffect(() => {
  //   if (showNewProductoForm){
  //     const handleEsc = (event) => {
  //       if (event.keyCode === 27) {
  //        setShowNewProductoForm(false);
  //      }
  //    };
  //    window.addEventListener('keydown', handleEsc);
  //    return () => {
  //     window.removeEventListener('keydown', handleEsc);
  //     };
  //   }
  //   return () => {
  //   };
  // }, [showNewProductoForm]); 

  return (
  <>
    {
      showNewProductoForm?(
        <AddNewProduct refreshAction={refreshData} handleClick={handleHideForm} categories={dataCategories} />
      ):('')
    }
    <DashboardWrapper>
        <Products triggerOnBlankField={resetDataProductsInitialValue} searchHandler={searchFieldHandler} handleClick={handleShowForm} medicineData={currentDataProducts} categories={dataCategories} refreshAction={''} />
    </DashboardWrapper>
  </>  
  )
}

export async function getStaticProps() {
    const resultProducts = await axios.get(BASE_URL_API+"/products")
    const dataProducts = resultProducts.data;
    const resultCategories = await axios.get(BASE_URL_API+"/categories")
    const dataCategories = resultCategories.data;
    return {
      props: {
        dataProducts,
        dataCategories,
      },
    }
  }
  
export default DashboardProducts