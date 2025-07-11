import SectionSubHeading from './ui/SectionSubHeading'
import SectionHeading from './ui/SectionHeading'
import BlogCard from './Blogs/BlogCard'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../services/blogService'
import { LoadingState } from './ui/LoadingState'
import { ErrorState } from './ui/ErrorState'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const NewsAndArticle = () => {
    const { data: blogs = [], isError, isLoading, error} = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs
    })

    if(isLoading) return <LoadingState name={'Blogs'} />;
    if(isError) return <ErrorState name={'Blogs'} />;


    const sortedBlogs = [...blogs].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
    );

    const latestBlogs = sortedBlogs.slice(0, 6);


  return (
    <div className='p-20'>
        <div className='text-center'>
            <SectionSubHeading text={'News & Articles'} />
            <SectionHeading text={'Our Latest News & Articles'} />
        </div>
        <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        >
            {
                latestBlogs.map((blog) =>(
                    <SwiperSlide key={blog._id} className='max-w-md' >
                        <BlogCard key={blog._id} blog={blog}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>

        <div className='flex justify-center mt-10'>
            <Link to={'/blogs'}>
                <button className="group px-6 py-2 bg-gradient-to-r from-cyan-800 to-cyan-600 text-white text-sm font-semibold rounded-full shadow-md hover:from-cyan-300 hover:to-cyan-700 hover:scale-105 transition-all duration-300 uppercase flex items-center gap-2">
                    See Blogs
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </Link>
        </div>
    </div>
  )
}

export default NewsAndArticle