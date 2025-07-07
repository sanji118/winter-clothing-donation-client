
import Searchbar from "../Searchbar";
import BlogCategory from "./BlogCategory";
import RecentPosts from "./RecentPosts";

const Sidebar = ({
  blogs,
  setSelectedTag,
  selectedTag,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  const tagCount = {};
  blogs.forEach(blog => {
    blog.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const allCategories = Array.from(
    new Set(blogs.flatMap(blog => blog.categories || []))
  );

  const recentBlogs = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const popularTags = Object.entries(tagCount)
    .filter(([tag, count]) => count > 1)
    .map(([tag]) => tag);

  return (
    <div className='grid grid-cols-1 gap-10 mt-10 lg:mt-0 h-fit'>
      {/* Search bar */}
      <div className="bg-gray-100 p-5 md:p-8 rounded-2xl">
        <Searchbar
          onSearch={setSearchTerm}
          placeholder="Search blogs by title"
        />
      </div>

      {/* Blog Category */}
      <div className="bg-gray-100 p-5 md:p-8 rounded-2xl">
        <BlogCategory
          categories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-100 p-5 md:p-8 rounded-2xl">
        <RecentPosts recentBlogs={recentBlogs} />
      </div>

      {/* Popular tags */}
      <div className='bg-gray-100 rounded-2xl p-5 md:p-8'>
        <h1 className='text-xl md:text-2xl font-semibold mb-4'>Popular Tags</h1>
        <div className='flex flex-wrap gap-3'>
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(prev => (prev === tag ? null : tag))}
              className={`text-sm px-4 py-2 rounded-full border transition-all ${
                selectedTag === tag
                  ? 'bg-cyan-600 text-white border-cyan-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-purple-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
