import React from 'react'
import { FaCalendar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const RecentPosts = ({ recentBlogs }) => {
  return (
    <div>
      <h1 className='text-xl md:text-2xl font-semibold mb-4'>Recent Posts</h1>
      <div className='flex flex-col gap-5'>
        {
          recentBlogs.map(blog => (
            <Link
            to={`/blogs/${blog._id}`}
              key={blog._id}
              className='group flex gap-5 items-center transition-all duration-300 ease-in-out cursor-pointer'
            >
              <div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='w-24 h-24 rounded-2xl object-cover transition-all duration-300 ease-in-out group-hover:grayscale hover:scale-[1.02]'
                />
              </div>
              <div>
                <div className='flex gap-2 items-center text-sm mb-1'>
                  <FaCalendar className='fill-yellow-500' />
                  <p className='opacity-70'>{new Date(blog.date).toDateString()}</p>
                </div>
                <h2 className='text-base md:text-lg font-semibold'>
                  {(blog.title).slice(0, 40)}...
                </h2>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default RecentPosts
