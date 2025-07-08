import { useQuery } from '@tanstack/react-query'
import image from '../../../public/pageBanners/testimonial-banner.png'
import { getTestimonials } from '../../utils/useTestimonials'
import PageBanner from '../../components/ui/PageBanner'
import SectionSubHeading from '../../components/ui/SectionSubHeading'
import SectionHeading from '../../components/ui/SectionHeading'
import mail from '../../assets/images/mail.gif'
import { ErrorState } from '../../components/ui/ErrorState'
import { LoadingState } from '../../components/ui/LoadingState'
import { FaStar } from 'react-icons/fa6'

const TestimonialsPage = () => {
  const {data: testimonials = [], isLoading, isError} = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
  })
  console.log(testimonials);
  if(isLoading) return <LoadingState name={'Testimonials'} />;
  if(isError) return <ErrorState name={'Testimonials'}/>


  return (
    <div >
      <PageBanner image={image} title={'Testimonials'} />
      <div className='p-5 md:p-20'>
        <div className='text-center mx-auto w-fit'>
          <SectionSubHeading text={'Testimonials'}/>
          <div className='flex items-center gap-2'><SectionHeading text={'What People Say?'} /> <img src={mail} alt="mail.gif" className='w-10 mb-5'/></div>
        </div>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-10 '>
          {
            testimonials.map(testimonial => (
              <div className='bg-[url(https://i.postimg.cc/cJ20q1Gy/cyan-brush-stroke.jpg)]  bg-no-repeat bg-cover p-5 md:p-10 relative'>
                <div className='flex absolute top-0 right-0 w-16 h-10 md:w-24 md:h-18
                rounded-l-full rounded-br-full items-center justify-center gap-2 bg-yellow-500 text-white'>
                  <FaStar className='fill-cyan-800'/> 
                  <p>{testimonial.rating}</p>    
                </div>
                <div className='flex gap-5 items-center '>
                  <div className='border-3 border-amber-500 rounded-full p-1'>
                    <img src={testimonial.image} alt="" className='w-24 md:w-40 h-24 md:h-40 rounded-full '/>
                  </div>
                  <div>
                    <h1 className='text-lg md:text-2xl '>{testimonial.name}</h1>
                    <p className='opacity-80 text-sm md:text-lg'>{testimonial.role}</p>
                  </div>
                </div>
                <div className='opacity-80 text-sm md:text-lg my-5 md:my-10'>
                  "{testimonial.quote}"
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TestimonialsPage