import React, {useState, useCallback} from 'react'
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
    console.log("Refreshing data!");
    const resultProducts = await axios.get(BASE_URL_API+"/products")
    const dataProductsResult = resultProducts.data;
    setCurrentDataProducts(dataProductsResult)    
  }

  const searchFieldHandler = useCallback(
    (value) =>{
      const valueLower = value.toLowerCase()
      setCurrentDataProducts((prevDataProducts)=>prevDataProducts.filter((prod)=>prod.name.toLowerCase().startsWith(valueLower)))
    },
    [dataProducts],
  )

  const categoryFilterHandler = (categoryFilter) => {
    setCurrentDataProducts(()=>dataProducts.filter((prod)=>prod.category.id===categoryFilter))
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
        <Products triggerOnBlankField={resetDataProductsInitialValue} categoryFilterHandler={categoryFilterHandler} searchHandler={searchFieldHandler} handleClick={handleShowForm} medicineData={currentDataProducts} categories={dataCategories} refreshAction={''} />
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