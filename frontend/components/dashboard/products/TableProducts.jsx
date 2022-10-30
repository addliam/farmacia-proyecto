import React from 'react'
import Link from 'next/link'

const TableProductsRow = ({product}) => {
    return (
    <tr className="bg-white text-[14px] border-b hover:bg-gray-50">
        <th scope="row" className="py-3 px-6 font-medium text-gray-900 whitespace-nowrap">
            { product.name }
        </th>
        <td className="py-3 px-6">
            { product._id }
        </td>
        <td className="py-3 px-6">
            { product.category.name }
        </td>
        <td className="py-3 px-6">
            { product.stock }
        </td>
        <td className="py-3 px-6">
            { product.purchasePrice.$numberDecimal }
        </td>
        <td className="py-3 px-6 text-right">
            <Link href={product?`/products/${product._id}`:"#"}>
                <a className="font-medium text-blue-600 hover:underline">Edit</  a>                  
            </Link>
        </td>
    </tr>
    )
}


const TableCategories = ({data}) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-5/6">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Medicine name
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Medicine ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Category
                    </th>                    
                    <th scope="col" className="py-3 px-6">
                        Stock
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Price
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length>0?data.map((product)=>(
                        <TableProductsRow key={product._id} product={product} />
                    )):''
                }

            </tbody>
        </table>
    </div>    
  )
}

export default TableCategories