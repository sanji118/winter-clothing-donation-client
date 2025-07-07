import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { RiQuillPenLine } from 'react-icons/ri';

const AuthorInfo = ({ blog }) => {
  return (
    <div className="inline-flex items-center justify-center space-x-4 mb-10 p-3 bg-white rounded-xl shadow-lg border-l-4 border-amber-500 mx-auto">
      <div className="flex-shrink-0 relative">
        <img 
          className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md" 
          src={blog.author.avatar} 
          alt={blog.author.name} 
        />
        <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1.5">
          <RiQuillPenLine className="text-white text-xs" />
        </div>
      </div>
      <div className="text-left">
        <p className="text-lg font-bold text-gray-900">{blog.author.name}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-1.5 text-amber-500" />
            {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center">
            <FaClock className="mr-1.5 text-cyan-500" />
            {blog.readingTime} min read
          </span>
        </div>
      </div>
    </div>
  )
}

export default AuthorInfo;