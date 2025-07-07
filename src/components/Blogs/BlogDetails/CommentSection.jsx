import { FaRegComment, FaUserCircle } from 'react-icons/fa';
import useAuth from '../../../utils/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCommentToBlog } from '../../../utils/useBlogs';

const CommentsSection = ({ blog }) => {
    const {user} = useAuth();
    const queryClient = useQueryClient();

    const { mutate: addComment , isPending } = useMutation({
        mutationFn: postCommentToBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs', blog._id]})
        }
    })
    const handleComment = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const newComment = {
            comment,
            user : {
                name: user?.displayName,
                email: user?.email,
                avatar: user?.photoURL 
            }
        }; 
        addComment({id: blog._id, newComment});
        form.reset();
    }
    
  return (
    <div className="border-t border-gray-200 pt-14 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
        <h3 className="text-2xl font-bold text-gray-900 inline-flex items-center bg-gradient-to-r from-cyan-600 to-amber-600 bg-clip-text ">
          <span className="mr-3 p-2 bg-gradient-to-br from-cyan-400 to-amber-400 text-white rounded-full shadow-lg">
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
        <div className="space-y-6 mt-8">
          {blog.comments.map((comment, index) => (
            <div key={index} className="p-6 bg-gradient-to-r from-amber-50 to-cyan-50 rounded-xl shadow-sm border-l-4 border-amber-400">
              <div className="flex items-start gap-4">
                {comment.user.avatar ? (
                  <img 
                    src={comment.user.avatar} 
                    alt={comment.user.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 shadow"
                  />
                ) : (
                  <FaUserCircle className="text-4xl text-amber-500" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-800">{comment.user.name}</h4>
                    <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.text}</p>
                  <div className="mt-3 flex gap-4">
                    <button className="text-xs text-cyan-600 hover:text-cyan-800 font-medium">
                      Reply
                    </button>
                    <button className="text-xs text-amber-600 hover:text-amber-800 font-medium">
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleComment} className="mt-10 bg-gradient-to-br from-amber-50 to-cyan-50 p-6 rounded-xl shadow-lg border-l-4 border-amber-400">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-gradient-to-r from-amber-400 to-cyan-400 text-white rounded-full">
            <FaRegComment className="text-sm" />
          </span>
          Leave a comment
        </h4>
        <textarea
          name='comment' 
          className="w-full px-5 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-5 text-gray-700 placeholder-gray-400 bg-white shadow-sm" 
          rows="4" 
          placeholder="Share your thoughts..."
          required
        ></textarea>
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isPending}
            className={`px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-lg hover:from-amber-500 hover:to-orange-500 transition transform hover:-translate-y-1 shadow-lg flex items-center gap-2 ${
              isPending ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentsSection;