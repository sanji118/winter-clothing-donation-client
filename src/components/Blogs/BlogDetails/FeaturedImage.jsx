const FeaturedImage = ({ blog }) => {
  return (
    <div className="mb-14 relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
      <img 
        className="relative w-full h-[80vh] object-cover rounded-xl shadow-2xl border-4 border-white transform group-hover:-translate-y-1 transition duration-300" 
        src={blog.image} 
        alt={blog.title} 
      />
    </div>
  )
}

export default FeaturedImage;