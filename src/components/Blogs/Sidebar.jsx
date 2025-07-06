import React from 'react'
import Searchbar from '../Searchbar'
import BlogCategory from './BlogCategory'
import RecentPosts from './RecentPosts'

const Sidebar = ({blogs}) => {
  return (
    <div className='grid grid-cols-1 gap-10'>
        <Searchbar/>
        <BlogCategory/>
        <RecentPosts/>
        <div>

        </div>
    </div>
  )
}

export default Sidebar