import { ArrowRight } from 'lucide-react'
import React from 'react'

const BlogCategory = ({categories}) => {
    console.log(categories)
  return (
    <div>
        <h1 className='text-xl md:text-2xl font-semibold mb-4'>Category</h1>
        <div>
            <div className='grid gap-5'>
                {
                    categories.map( category => (
                        <div className='text-gray-400 flex justify-between items-center p-4 rounded-full w-full border border-gray-300 bg-white'><p>{category}</p> <ArrowRight/></div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default BlogCategory