import React from 'react'
import SectionSubHeading from './ui/SectionSubHeading'
import SectionHeading from './ui/SectionHeading'
import BlogCard from './Blogs/BlogCard'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../utils/useBlogs'

const NewsAndArticle = () => {
    const { data: blogs = [], isError, isLoading, error} = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs
    })

    
  return (
    <div>
        <div className='text-center'>
            <SectionSubHeading text={'News & Articles'} />
            <SectionHeading text={'Our Latest News & Articles'} />
        </div>
        <div></div>
    </div>
  )
}

export default NewsAndArticle