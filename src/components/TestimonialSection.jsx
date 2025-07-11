import SectionSubHeading from './ui/SectionSubHeading'
import SectionHeading from './ui/SectionHeading'
import { useQuery } from '@tanstack/react-query'
import { getTestimonials } from '../services/testimonialService'
import { useEffect, useState } from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import { FaStar } from 'react-icons/fa6'
import { LoadingState } from './ui/LoadingState'
import { ErrorState } from './ui/ErrorState'

const TestimonialSection = () => {
    const [index, setIndex] = useState(0);
    const {data: testimonials = [], isLoading, isError, error} = useQuery({
        queryKey: ['/testimonials'],
        queryFn: getTestimonials
    })

    useEffect(() =>{
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    })

    const testimonial = testimonials[index];
    const progress = Math.min(index / (testimonials.length) * 100 , 100) ;

    if(isLoading) return <LoadingState name={'Testimonials'} />
    if(isError) return <ErrorState name={'Testimonials'} />


  return (
    <div className='bg-gray-800 p-5 md:p-20 flex flex-col lg:flex-row gap-16'>
        <div>
            <AnimatePresence mode='wait'>
                <motion.div
                key={testimonial._id}
                initial={{opacity: 0.9}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
                >
                    <div className="relative w-64 md:w-92 h-80 md:h-96 left-10 md:left-20 lg:left-0">
                        <div>
                            <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-64 md:w-92 h-80 md:h-96 rounded-t-[200px] rounded-bl-4xl"
                            />
                            <div className='flex absolute bottom-0 w-16 h-16 md:w-30 md:h-30 rounded-t-[200px] rounded-bl-[136px] md:rounded-bl-[100px] items-center justify-center gap-1 bg-yellow-500 text-white'>
                                <FaStar className='fill-white'/> 
                                <p>{testimonial.rating}</p>    
                            </div>  
                        </div>
                        <div className="absolute top-5 md:top-10 -left-5 md:-left-10 border-3 w-64 md:w-92 h-80 md:h-96 border-yellow-600 rounded-t-[200px] rounded-bl-4xl"></div>
                    </div>
                </motion.div>

            </AnimatePresence>
        </div>
        <div className='text-white'>
            <SectionSubHeading text={'Testimonials'}/>
            <SectionHeading text={'Voices of Our Community'}/>
            <p className='opacity-70'>
                "{testimonial.quote}"
            </p>
            <div className='flex justify-between mt-10'>
                <div>
                    <h1 className='font-bold text-xl md:text-2xl'>{testimonial.name}</h1>
                    <p className='text-cyan-600 text-sm md:text-lg'>{testimonial.role}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <div><h1 className='text-xl md:text-3xl font-bold'>{index+1}</h1></div>
                    <div><progress className='progress progress-warning w-56' value={Math.floor(progress)} max={'100'}></progress></div>
                    <div><p className='text-sm md:text-lg'>{testimonials.length}</p></div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default TestimonialSection