import { ArrowRight } from 'lucide-react'
import React from 'react'

const BlogCategory = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div>
      <h1 className='text-xl md:text-2xl font-semibold mb-4'>Category</h1>
      <div className='grid gap-5'>
        {categories.map(category => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(prev => (prev === category ? null : category))
            }
            className={`text-gray-600 flex justify-between items-center p-4 rounded-full w-full border transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-cyan-600 text-white border-cyan-600'
                : 'bg-white border-gray-300 hover:bg-purple-100'
            }`}
          >
            <p>{category}</p>
            <ArrowRight />
          </button>
        ))}
      </div>
    </div>
  )
}

export default BlogCategory
