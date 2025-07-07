import { FaHeart, FaShareAlt, FaTwitter, FaFacebook } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';

const SocialStats = ({ blog }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl p-6 shadow-xl mb-16 border-b-4 border-cyan-400">
      <div className="flex items-center space-x-6 mb-4 sm:mb-0">
        <button className="flex items-center space-x-2 group">
          <span className="p-2 bg-amber-100 text-amber-600 rounded-full group-hover:bg-amber-500 group-hover:text-white transition">
            <FaHeart />
          </span>
          <span className="font-medium text-gray-700 group-hover:text-amber-600">
            {blog.likes} Likes
          </span>
        </button>
        <button className="flex items-center space-x-2 group">
          <span className="p-2 bg-cyan-100 text-cyan-600 rounded-full group-hover:bg-cyan-500 group-hover:text-white transition">
            <IoMdPerson />
          </span>
          <span className="font-medium text-gray-700 group-hover:text-cyan-600">
            {blog.views} Views
          </span>
        </button>
      </div>
      <div className="flex space-x-3">
        <button className="p-3 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-500 hover:text-white transition transform hover:-translate-y-1 shadow-md">
          <FaTwitter />
        </button>
        <button className="p-3 rounded-full bg-cyan-100 text-cyan-600 hover:bg-cyan-500 hover:text-white transition transform hover:-translate-y-1 shadow-md">
          <FaFacebook />
        </button>
        <button className="flex items-center px-5 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-full hover:from-amber-500 hover:to-orange-500 transition transform hover:-translate-y-1 shadow-lg">
          <FaShareAlt className="mr-2" />
          Share
        </button>
      </div>
    </div>
  )
}

export default SocialStats;