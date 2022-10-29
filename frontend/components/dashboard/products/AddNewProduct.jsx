import React, {useState,useEffect} from 'react'
import Image from 'next/image'
import axios from "axios"

import toast, { Toaster } from 'react-hot-toast';

const BASE_URL_API = 'http://localhost:5000/api'

const AddNewProduct = ({handleClick, categories}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSelectChange = (e)=> {
        setCategory(e.target.value)
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const catId = categories.filter((c)=>c.name===category)[0]._id
        // TODO: input validation
        if (catId && name!=="" && category!=="" && description!=="" && price!==""){
            const json = JSON.stringify({
                name: name,
                description: category,
                categoryId: catId,
                purchasePrice: price,
            })
            const res = await axios.post(BASE_URL_API+"/products", json, {
                headers: {
                    'Content-Type': 'application/json'
                  }                
            })
            const responseData = res.data;
            const message = `Successfully added ${name}!`
            toast.success(message)
        }else{
            console.log("An error ocurred");
        }
    }

  return (
    <div className='bg-blackOverlay inline-block z-20 h-screen w-screen absolute'>
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            />
        <div className='bg-white relative px-8 py-7 mx-auto my-[70px] w-1/3'>
            <div onClick={()=>handleClick()} className='absolute rounded-full w-fit h-fit right-2 top-2 cursor-pointer' >
                <Image src={"/assets/icons/closeButton.png"} alt={'close button'} width={24} height={24} />
            </div>
            <h4 className='text-blackDark font-bold text-[22px]'>Add new product</h4>
            <form onSubmit={handleSubmitForm} className='flex flex-col gap-2 mt-4'>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className='mx-1 border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="text" placeholder='Medicine name' name='name' />   

                <label htmlFor="category">Category:</label>
                <select value={category} name="category" id="category" className='text-blackDark text-[14px] w-[217px] h-[38px] px-4 pr-8 mx-2 border-none' onChange={handleSelectChange} >
                    <option value="volvo">- Select Category -</option>
                    {
                    categories?(
                        categories.map((category)=>(
                        <option key={category._id} value={`${category.name}`}>{category.name}</option>
                        ))
                    ):("")
                    }
                </select>                

                <label htmlFor="description">Description:</label>
                <input value={description} onChange={(e)=>setDescription(e.target.value)} className='mx-1 border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="text" placeholder='Medicine description' name='description' />   

                <label htmlFor="price">Price:</label>
                <input value={price} onChange={(e)=>setPrice(e.target.value)} className='mx-1 border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="text" placeholder='Medicine price' name='price' />   

                {/* <label htmlFor="stock">Initial stock:</label>
                <input value={stock} onChange={(e)=>setStock(e.target.value)} className='mx-1 border-2 px-2 py-1 text-blackPrimary border-[rgba(29, 36, 46, 1)] focus:outline-none ' type="number" placeholder='Medicine initial stock' name='stock' />    */}

                <input className='cursor-pointer mt-4 text-white w-fit px-6 py-2 bg-orange ' type="submit" value="Add product" />
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

export default AddNewProduct