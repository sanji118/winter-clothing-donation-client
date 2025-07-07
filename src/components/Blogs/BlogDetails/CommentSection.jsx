import { FaRegComment } from 'react-icons/fa';

const CommentsSection = ({ blog }) => {
  return (
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
  )
}

export default CommentsSection;