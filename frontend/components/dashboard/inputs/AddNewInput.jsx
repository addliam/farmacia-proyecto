import React, {useState,useEffect} from 'react'
import Image from 'next/image'
import axios from "axios"

import toast, { Toaster } from 'react-hot-toast';

import { BASE_URL_API } from '../../lib/urlApi';

const AddNewInput = ({handleCloseClick, refreshAction, productsNameListData}) => {

    const dateNow = new Date()

    const [productId, setProductId] = useState(productsNameListData[0].id)
    const [batchNumber, setBatchNumber] = useState('')
    const [quantity, setQuantity] = useState('')

    const [caducityDay, setCaducityDay] = useState(dateNow.getDay()-1)
    const [caducityMonth, setCaducityMonth] = useState(dateNow.getMonth())
    const [caducityYear, setCaducityYear] = useState(dateNow.getFullYear())

    const resetFormValuesDefault = () => {
        setCaducityDay(dateNow.getDay()-1)
        setCaducityMonth(dateNow.getMonth())
        setCaducityYear(dateNow.getFullYear())
    }

    const handleSelectChange = (e)=> {
        setProductId(e.target.value)
    }

    const handleQuantity = (e) => {
        setQuantity(()=> e.target.value <= 1 ? 1 : e.target.value )
    }

    const handleBatchNumber = (e)=>{
        // Not allowed more than 10 digits
        setBatchNumber((prev)=> {
            if (e.target.value < 0){
                return prev
            }
            else if (e.target.value.length > 10 ){
                return ~~(parseInt(e.target.value) / 10)
            }
            else{
                return e.target.value
            }
        })
    }

    const handleCaducityDay = (e) => { 
        // TODO: set max day related to current max days of selected month
        const maxDayOfMonth = 31
        setCaducityDay(() => {
            if (e.target.value >= maxDayOfMonth){
                return maxDayOfMonth
            }
            else if (e.target.value <= 1){
                return 1
            }
            else { return e.target.value}
        })
    }

    const handleCaducityMonth = (e) => {
        setCaducityMonth(() => {
            if (e.target.value >= 12){
                return 12
            }
            else if (e.target.value <= 1){
                return 1
            }
            else { return e.target.value}
        })
    }

    const handleCaducityYear = (e) => {
        setCaducityYear(() => {
            if (e.target.value >= 3000){
                return 3000
            }
            else if (e.target.value <= 2000){
                return 2000
            }
            else { return e.target.value}
        })        
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        // TODO: input validation
        if (batchNumber!=="" && quantity!=="" && productId!==""){
            const dateFormatted = `${caducityMonth}/${caducityDay}/${caducityYear}`
            const json = JSON.stringify({
                productId: productId,
                batchNumber: batchNumber,
                quantity: quantity,
                caducation: dateFormatted,
            })
            try {
                const res = await axios.post(BASE_URL_API+"/inputs", json, {
                    headers: {
                        'Content-Type': 'application/json'
                      }                
                })
                if (res.status < 300){
                    const message = `Batch ${batchNumber} added`
                    toast.success(message)        
                    refreshAction()        
                }                
            } catch (error) {
                toast.error("An error ocurred")
            }
        }else{
            toast.error("Fields cannot be empty!")
        }
    }

  return (
    <div className='bg-blackOverlay z-[99] h-screen w-screen absolute flex flex-row justify-center items-center '>
    <Toaster
            position="bottom-center"
            reverseOrder={false}
            />
        <div className='bg-white h-min relative px-8 py-7 mx-auto my-[70px] w-fit '>
            <div onClick={()=>handleCloseClick()} className='absolute rounded-full w-fit h-fit right-2 top-2 cursor-pointer' >
                <Image src={"/assets/icons/closeButton.png"} alt={'close button'} width={24} height={24} />
            </div>
            <h4 className='text-blackDark font-bold text-[22px]'>Add new input</h4>
            <form onSubmit={handleSubmitForm} className='flex flex-col gap-2 mt-4'>
                <label htmlFor="name">Product</label>
                <select value={productId} name="category" id="category" className='text-blackDark text-[14px] w-[217px] h-[38px] px-4 pr-8 mx-2 border-none' onChange={handleSelectChange} >
                    {
                    productsNameListData?(
                        productsNameListData.map((prod)=>(
                        <option key={prod.id} value={`${prod.id}`}>{prod.name}</option>
                        ))
                    ):("")
                    }
                </select>                

                <label htmlFor="batchNumber">Batch number:</label>
                <input value={batchNumber} onChange={handleBatchNumber} className='mx-1 max-w-[250px] border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="number" placeholder='Batch number' name='batchNumber' />   

                <label htmlFor="quantity">Quantity:</label>
                <input value={quantity} onChange={handleQuantity} className='mx-1 max-w-[250px] border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="number" placeholder='Input quantity' name='quantity' />   

                <label htmlFor="Caducity">{`Caducity (MM-DD-YYYY):`}</label>
                {
                    // TODO: add info - Caducity may not be required if product w given batch number is already registered. It will add quantity to existent batch
                }
                <div className='flex flex-row gap-3 w-full'>
                    <input value={caducityMonth} onChange={handleCaducityMonth} className='mx-1 max-w-[64px] border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="number" placeholder='Medicine price' name='caducityMonth' />   
                    <input value={caducityDay} onChange={handleCaducityDay} className='mx-1 max-w-[64px] border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="number" placeholder='Medicine price' name='caducityDay' />   
                    <input value={caducityYear} onChange={handleCaducityYear} className='mx-1 max-w-[80px] border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="number" placeholder='Medicine price' name='CaduccaducityYearity' />   
                </div>
                <input className='cursor-pointer mt-4 text-white w-fit px-6 py-2 bg-orange ' type="submit" value="Register product input" />
            </form>
        </div>
    </div>
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

export default AddNewInput