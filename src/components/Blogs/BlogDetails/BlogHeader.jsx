const BlogHeader = ({ blog }) => {
  return (
    <div className="mb-10">
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center text-amber-600 hover:text-amber-800 transition-all duration-300 group"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">
          &larr;
        </span>
        <span className="font-medium bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent underdog">
          Back to Blogs
        </span>
      </button>
      
      <div className="mb-12 text-center relative">
        <div className='flex justify-center items-center'>
          {blog.categories.map(category => (
            <div key={category} className="inline-block px-4 py-1.5 text-sm font-bold text-cyan-800 bg-cyan-100 rounded-full mb-6 shadow-md">
              {category}
            </div>
          ))}
        </div>
        
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text">
          {blog.title}
        </h1>
      </div>
    </div>
  )
}

export default BlogHeader;