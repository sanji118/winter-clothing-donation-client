const TagsSection = ({ blog }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-14">
      {blog.tags.map(tag => (
        <span 
          key={tag} 
          className="px-4 py-1.5 bg-white text-gray-800 text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400 hover:text-white"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}

export default TagsSection;