import { FaHeart, FaShareAlt, FaClock, FaCalendarAlt, FaTwitter, FaFacebook, FaRegComment } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { RiDoubleQuotesL, RiQuillPenLine } from 'react-icons/ri';

const BlogDetails = ({ blog }) => {
    console.log(blog.categories)
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 bg-gradient-to-b from-amber-50 to-cyan-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

      <div className="relative">
        {/* Header with fancy back button */}
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
        </div>

        {/* Article Header */}
        <div className="mb-12 text-center relative">
            <div className='flex justify-center items-center'>
                {
                    blog.categories.map(category => (
                        <div key={blog._id} className="inline-block px-4 py-1.5 text-sm font-bold text-cyan-800 bg-cyan-100 rounded-full mb-6 shadow-md">{category}</div>
                    ))
                }
            </div>
          
          <h1 className="text-5xl font-extrabold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text">
            {blog.title}
          </h1>
          
          {/* Author Info with fancy border */}
          <div className="inline-flex items-center justify-center space-x-4 mb-10 p-3 bg-white rounded-xl shadow-lg border-l-4 border-amber-500">
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
        </div>

        {/* Featured Image with fancy frame */}
        <div className="mb-14 relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <img 
            className="relative w-full h-[80vh] object-cover rounded-xl shadow-2xl border-4 border-white transform group-hover:-translate-y-1 transition duration-300" 
            src={blog.image} 
            alt={blog.title} 
          />
        </div>

        {/* Article Content with fancy elements */}
        <div className="prose prose-xl max-w-none mx-auto mb-16 relative">
          <div className="absolute -left-8 top-0 h-full w-1 bg-gradient-to-b from-amber-400 via-orange-400 to-cyan-400 rounded-full"></div>
          
          <p className="text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
            {blog.excerpt}
          </p>
          
          <div className="relative my-10 p-6 bg-gradient-to-r from-amber-50 to-cyan-50 rounded-xl border-r-4 border-b-4 border-cyan-400 shadow-inner">
            <div className="absolute -top-3 -left-3 text-amber-500 ">
              <RiDoubleQuotesL className="text-4xl bg-gray-50" />
            </div>
            <p className="text-gray-700 italic font-medium">
              "{blog.metaDescription}"
            </p>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8">
            {blog.content}
          </p>
          
        </div>

        {/* Tags with colorful hover */}
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

        {/* Social Sharing and Likes - Fancy card */}
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

        {/* Author Bio - Fancy card */}
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
                <a href={`https://twitter.com/${blog.author.social.twitter}`} className="p-2 bg-cyan-100 text-cyan-600 rounded-full hover:bg-cyan-500 hover:text-white transition">
                  <FaTwitter />
                </a>
                <a href={`https://facebook.com/${blog.author.social.facebook}`} className="p-2 bg-amber-100 text-amber-600 rounded-full hover:bg-amber-500 hover:text-white transition">
                  <FaFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section - Fancy design */}
        <div className="border-t border-gray-200 pt-14 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
            <h3 className="text-2xl font-bold text-gray-900 inline-flex items-center bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text ">
              <span className="mr-3 p-2 bg-cyan-100 text-cyan-600 rounded-full">
                <FaRegComment />
              </span>
              Comments ({blog.comments.length})
            </h3>
          </div>
          
          {blog.comments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div>
              {/* Comment list would go here */}
            </div>
          )}
          
          <form className="mt-10 bg-white p-6 rounded-xl shadow-lg border-l-4 border-amber-400">
            <textarea 
              className="w-full px-5 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-5 text-gray-700 placeholder-gray-400" 
              rows="4" 
              placeholder="Share your thoughts..."
            ></textarea>
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-lg hover:from-amber-500 hover:to-orange-500 transition transform hover:-translate-y-1 shadow-lg"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails