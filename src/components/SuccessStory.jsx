import SectionSubHeading from './ui/SectionSubHeading'
import SectionHeading from './ui/SectionHeading'
import { ArrowUpRight, QuoteIcon } from 'lucide-react'
import {easeInOut, motion} from 'framer-motion';
import { Link } from 'react-router-dom';

const SuccessStory = () => {
  return (
    <div className='p-5 md:p-20 bg-gradient-to-b from-gray-200 to-white flex flex-col lg:flex-row gap-16'>
        <div className='flex lg:order-2'>
            <div className='flex flex-col justify-between flex-1/5 md:flex-2/5'>
                <div className='flex flex-col relative md:items-end items-center top-7 md:top-16'>
                    <div className='transform -rotate-90'>
                        <p className='text-yellow-500 text-xs md:text-xl'>Years of</p>
                        <h1 className='text-sm md:text-2xl opacity-60 font-semibold'>Experience</h1>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-6xl font-bold opacity-60 relative md:top-5 md:right-7 mt-6'>16</h1>
                    </div>
                </div>
                <motion.div 
                className='bg-white rounded-lg md:rounded-4xl p-3 md:p-8 absolute md:relative mt-30 w-3/5 md:w-full md:bottom-5'
                animate = {{x: [0, 50, 0]}}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: easeInOut
                }}
                >
                    <h1 className='font-bold text-lg md:text-2xl mb-5 flex justify-between'>
                        Adam Cruz <QuoteIcon className='text-cyan-500 fill-cyan-500'/>
                    </h1>
                    <p className='opacity-70 text-xs md:text-lg'>This child shivered through the night, lacking even a warm blanket. Your donations bring more than warmth — they bring hope. </p>
                </motion.div>
            </div>
            <div className='flex-4/5 md:flex-3/5'>
                <img src="https://i.postimg.cc/N0vszs8P/Chat-GPT-Image-Jul-3-2025-01-19-12-PM.png" alt="Child in Winter Cold" className='rounded-xl md:rounded-4xl w-full' />
            </div>
        </div>
        <div className='lg:order-1'>
            <SectionSubHeading text={'Success Story'} />
            <SectionHeading text={'Equipping nonprofit leaders with funding, tools, and knowledge for impact.'} />
            <p className='opacity-70'>Our secure online donation platform lets you contribute quickly and safely. Choose from multiple payment methods and set up one-time or recurring donations with ease.</p>
            <Link to={'/testimonials'}><button className='btn bg-white rounded-full mt-10 py-6 px-6 shadow-none text-gray-700 border-black'>Our Success Story <ArrowUpRight/></button></Link>
        </div>
    </div>
  )
}

export default SuccessStory