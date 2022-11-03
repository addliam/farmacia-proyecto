import React from 'react'
import Link from 'next/link'

const TableBatchsRow = ({item}) => {
    const creationDate = new Date(item.createdAt) 
    return (
    <tr className="bg-white text-[14px] border-b hover:bg-gray-50">
        {/* <th scope="row" className="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">
            { item._id }
        </th> */}
        <td className="py-3 px-6">
            { item.batch.number }
        </td>
        <td className="py-3 px-6">
            { item.batch.product.name }
        </td>
        <td className="py-3 px-6">
            { item.quantity }
        </td>
        <td className="py-3 px-6">
            {  `${creationDate.toLocaleString()}`  }
        </td>
        <td className="py-3 px-6 text-right">
            <Link href={item?`/batchs/${item._id}`:"#"}>
                <a className="font-medium text-blue-600 hover:underline">Edit</  a>                  
            </Link>
        </td>
    </tr>
    )
}

const a = {
    "product": {
      "id": "6352aae33c330101f8f93340",
      "name": "Ibuprofeno 500mg"
    },
    "stock": 0,
    "number": 68790232,
    "caducation": "2023-02-02T05:00:00.000Z",
    "_id": "635f0fd8b7a46c46dc2357e5",
    "createdAt": "2022-10-30T23:59:20.078Z",
    "updatedAt": "2022-10-30T23:59:20.078Z",
    "__v": 0
  }
  

const TableInputs = ({data}) => {
  return (
    <div className="relative shadow-md sm:rounded-lg w-5/6 mx-auto ">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {/* <th scope="col" className="py-3 px-6">
                        Input id
                    </th> */}
                    <th scope="col" className="py-3 px-6">
                        Batch number
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Product name
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Quantity
                    </th>                    
                    <th scope="col" className="py-3 px-6">
                        Registered at
                    </th>                    
                    <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length>0?data.map((product)=>(
                        <TableBatchsRow key={product._id} item={product} />
                    )):(
                        <tr className='px-4 flex flex-row py-4'>
                            <td>
                                <span >No data found</span>
                            </td>
                        </tr>
                    )
                }

            </tbody>
        </table>
    </div>    
  )
}

export default TableInputs