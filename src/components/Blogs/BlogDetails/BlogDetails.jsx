import ArticleContent from "./ArticlaContent";
import AuthorBio from "./AuthorBio";
import AuthorInfo from "./AuthorInfo";
import BlogHeader from "./BlogHeader";
import CommentsSection from "../../CommentSection";
import FeaturedImage from "./FeaturedImage";
import SocialStats from "./SocialStats";
import TagsSection from "./TagsSection";
import { postCommentToBlog } from "../../../services/blogService";


const BlogDetails = ({ blog }) => {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16 bg-gradient-to-b from-amber-50 to-cyan-50 rounded-2xl">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

      <div className="relative">
        <BlogHeader blog={blog} />
        <AuthorInfo blog={blog} />
        <FeaturedImage blog={blog} />
        <ArticleContent blog={blog} />
        <TagsSection blog={blog} />
        <SocialStats blog={blog} />
        <AuthorBio blog={blog} />
        <CommentsSection 
          id={blog._id} 
          comments={blog.comments} 
          type="blog" 
          postCommentFunction={postCommentToBlog} 
        />
      </div>
    </div>
  )
}

export default BlogDetails;