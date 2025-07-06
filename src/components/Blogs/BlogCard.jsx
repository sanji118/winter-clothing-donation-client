import { Eye, Heart, Clock, Calendar } from 'lucide-react';
import blackBrushStroke from '../../assets/images/black-brush-stroke-corner.png';

const BlogCard = ({ blog }) => {
  return (
    <div className=" mx-auto rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl bg-white flex flex-col border border-[#77d5d5]">
      <div className="relative h-52 flex-shrink-0">
        <img src={blog.image} alt={blog.title} className=" w-full h-full object-cover" />
        <img
          src={blackBrushStroke}
          alt=""
          className="absolute top-0 left-0 w-32 h-32 opacity-90 z-10"
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <span className="absolute top-2 right-2 z-20 px-3 py-1 text-xs font-semibold text-white bg-cyan-600 rounded-full">
          {blog.categories[0]}
        </span>
      </div>

      {/* Content */}
      <div className="flex-grow px-6 py-4">
        <h2 className="text-lg font-bold text-navy-900 hover:text-cyan-600 transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{blog.content.slice(0,200)}...</p>

        {/* Author & Meta Info */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center group">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-9 h-9 rounded-full mr-2 border border-gray-300"
            />
            <span className="text-xs text-gray-700 group-hover:underline">{blog.author.name}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">

            <span className='flex items-center gap-1 '><Calendar className='w-4 h-4 text-yellow-500'/>{new Date(blog.date).toLocaleDateString()}</span>
            <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
              <Clock className="w-3 h-3 mr-1" />
              {blog.readingTime} min
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-semibold text-cyan-700 bg-cyan-100 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      
      <div className="flex items-center justify-between px-6 py-3 bg-yellow-200">
        <div className="flex gap-4 text-sm text-gray-700">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1 text-cyan-500" />
            {blog.views}
          </span>
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1 text-yellow-600" />
            {blog.likes}
          </span>
        </div>
        <button className="px-4 py-1 text-xs font-bold bg-fuchsia-300 rounded-md  transition-all duration-300 uppercase">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
