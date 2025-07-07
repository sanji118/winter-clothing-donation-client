import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { RiQuillPenLine } from 'react-icons/ri';

const AuthorBio = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl p-8 mb-16 shadow-2xl overflow-hidden relative border-t-4 border-amber-400">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100 rounded-full -mr-10 -mt-10 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-full -ml-10 -mb-10 opacity-30"></div>
      
      <div className="flex flex-col md:flex-row items-center relative z-10">
        <div className="relative mb-6 md:mb-0 md:mr-8">
          <img 
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl" 
            src={blog.author.avatar} 
            alt={blog.author.name} 
          />
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-cyan-400 text-white p-2 rounded-full shadow-md">
            <RiQuillPenLine />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text">
            About {blog.author.name}
          </h3>
          <p className="text-gray-700 mb-4">{blog.author.bio}</p>
          <div className="flex space-x-4">
            <a href={`https://twitter.com/${blog.author.social?.twitter}`} className="p-2 bg-cyan-100 text-cyan-600 rounded-full hover:bg-cyan-500 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href={`https://facebook.com/${blog.author.social?.facebook}`} className="p-2 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-500 hover:text-white transition">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorBio;