import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/blogService";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import BlogCard from "../../components/Blogs/BlogCard";
import Sidebar from "../../components/Blogs/Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import BlogDetails from '../../components/Blogs/BlogDetails/BlogDetails';
import PageBanner from '../../components/ui/PageBanner';

const BlogPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  const [selectedTag, setSelectedTag] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);


  useEffect(() => {
    if (id) {
      const blog = blogs.find(b => b._id === id);
      setSelectedBlog(blog || null);
    } else {
      setSelectedBlog(null);
    }
  }, [id, blogs]);

  if (isLoading) return <LoadingState name={'Blogs'} />;
  if (isError) return <ErrorState name={'Blogs'} />;

  const filteredBlogs = blogs
    .filter(blog => selectedTag ? blog.tags.includes(selectedTag) : true)
    .filter(blog => selectedCategory ? blog.categories?.includes(selectedCategory) : true)
    .filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      {/* Banner */}
      <PageBanner image={'./pageBanners/blogBanner.jpg'} title={'Our blog'} subtitle={''} />

      
      <div className="grid grid-cols-1 p-5 lg:grid-cols-3 gap-10 md:p-20">
        
        {/* Blog Details */}
        <div className="flex flex-col items-center gap-10 w-full lg:col-span-2">
          {
            selectedBlog ? (
              
              <BlogDetails key={selectedBlog._id} blog={selectedBlog} />
            ) : (
              
              filteredBlogs.length === 0 ? (
                <p className="text-center text-gray-500">No blogs found.</p>
              ) : (
                filteredBlogs.map(blog => (
                  <div
                    key={blog._id}
                    className="max-w-2xl w-full shadow-md rounded-2xl cursor-pointer"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <BlogCard blog={blog}/>
                  </div>
                ))
              )
            )
          }
        </div>

        {/* Sidebar*/}
        <Sidebar
          blogs={blogs}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default BlogPage;
