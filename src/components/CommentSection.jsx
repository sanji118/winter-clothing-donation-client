import { FaRegComment, FaUserCircle, FaSpinner, FaHeart, FaReply } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import useAuth from '../services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentsSection = ({ 
    id, 
    comments = [], 
    type = 'blog',
    postCommentFunction 
}) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { mutate: addComment, isPending } = useMutation({
        mutationFn: ({ id, newComment }) => postCommentFunction({ id, newComment }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [type === 'blog' ? 'blogs' : 'donations']
            })
        }
    });

    const handleComment = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const newComment = {
            text: comment,
            user: {
                name: user?.displayName,
                email: user?.email,
                avatar: user?.photoURL 
            }
        }; 
        addComment({ id, newComment });
        form.reset();
    };

    return (
        <div className="pt-12 relative">
            {/* Floating comment header */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <div className="bg-cyan-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center">
                    <FaRegComment className="mr-2" />
                    <span className="font-medium">{comments.length} Comments</span>
                </div>
            </div>

            {/* Comments list */}
            <div className="space-y-6 mb-8">
                {comments.length === 0 ? (
                    <div className="text-center py-8 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100">
                        <p className="text-amber-600 italic">No comments yet. Break the ice!</p>
                    </div>
                ) : (
                    comments.map((comment, index) => (
                        <div key={index} className="group relative p-5 bg-white rounded-xl shadow-sm border border-amber-50 hover:border-amber-100 transition-all">
                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-300 to-amber-500 rounded-l-lg"></div>
                            <div className="flex items-start gap-4 pl-3">
                                {comment.user?.avatar ? (
                                    <img 
                                        src={comment.user.avatar} 
                                        alt={comment.user.name} 
                                        className="w-10 h-10 rounded-full object-cover border-2 border-amber-200 shadow-sm"
                                    />
                                ) : (
                                    <FaUserCircle className="text-4xl text-amber-400" />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-baseline flex-wrap gap-2">
                                        <h4 className="font-medium text-gray-800">{comment.user?.name || comment.user.split('@')[0]}</h4>
                                        <span className="text-xs text-amber-500 bg-amber-50 px-2 py-1 rounded-full">
                                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600">{comment.text}</p>
                                    <div className="mt-3 flex gap-4">
                                        <button className="text-xs text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1 transition">
                                            <FaReply className="text-xs opacity-70 group-hover:opacity-100" /> Reply
                                        </button>
                                        <button className="text-xs text-amber-600 hover:text-amber-800 font-medium flex items-center gap-1 transition">
                                            <FaHeart className="text-xs opacity-70 group-hover:opacity-100" /> Like
                                        </button>
                                        <button className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Comment form */}
            <form onSubmit={handleComment} className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-sm border border-amber-100">
                <h4 className="text-md font-medium text-amber-800 mb-4 flex items-center gap-2">
                    <span className="p-2 bg-amber-500 text-white rounded-full">
                        <IoMdSend className="text-sm" />
                    </span>
                    Share your thoughts
                </h4>
                <textarea
                    name="comment" 
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 mb-4 text-gray-700 placeholder-amber-300 bg-white shadow-inner" 
                    rows="3" 
                    placeholder="What resonates with you about this post?"
                    required
                ></textarea>
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isPending}
                        className={`px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-md flex items-center gap-2 ${
                            isPending ? 'opacity-80 cursor-not-allowed' : ''
                        }`}
                    >
                        {isPending ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Posting...</span>
                            </>
                        ) : (
                            <>
                                <span>Post Comment</span>
                                <IoMdSend className="text-sm" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentsSection;
