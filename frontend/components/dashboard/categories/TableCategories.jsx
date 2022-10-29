import React from 'react'
import Link from 'next/link'

const TableCategoryRow = ({category}) => {
    return (
    <tr className="bg-white border-b hover:bg-gray-50">
        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
            { category.name }
        </th>
        <td className="py-4 px-6">
            { category._id }
        </td>
        <td className="py-4 px-6">
            { category.count }
        </td>
        <td className="py-4 px-6 text-right">
            <Link href={category?`/categories/${category._id}`:"#"}>
                <a className="font-medium text-blue-600 hover:underline">Edit</  a>                  
            </Link>
        </td>
    </tr>
    )
}


const TableProducts = ({data}) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-5/6">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Category name
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Category ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Quantity
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length>0?data.map((category)=>(
                        <TableCategoryRow key={category._id} category={category} />
                    )):''
                }

            </tbody>
        </table>
    </div>    
  )
}

export default TableProducts