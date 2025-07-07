import { RiDoubleQuotesL } from 'react-icons/ri';

const ArticleContent = ({ blog }) => {
  return (
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
  )
}

export default ArticleContent;