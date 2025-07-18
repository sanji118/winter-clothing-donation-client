import fundRaising from '../assets/images/fundraiser.png';
import donation from '../assets/images/donation.png';
import image1 from '../assets/images/donate-charity-1.png';
import image2 from '../assets/images/donate-charity-2.jpg';
import image3 from '../assets/images/donate-charity-3.jpg';
import { motion } from 'framer-motion';
import SectionSubHeading from './ui/SectionSubHeading';
import SectionHeading from './ui/SectionHeading';
import { Link } from 'react-router-dom';
import Stats from './Stats';

const DonateCharity = () => {
  return (
    <div className="min-h-screen px-5 md:px-20 py-16">
      <div className='grid lg:grid-cols-2 gap-10'>
        {/* Responsive Image Animation Section */}
        <div className='relative h-[500px] sm:h-[600px] lg:h-auto'>
          {/* Main Image */}
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={image1} 
              alt="Charity donation" 
              className='rounded-2xl w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500' 
            />
          </motion.div>
          
          {/* Animated Overlay Images */}
          <div className='absolute -bottom-10 right-0 sm:right-12 lg:right-0 w-full max-w-[300px] sm:max-w-[400px]'>
            {/* First Floating Image */}
            <motion.div
              className="relative w-[70%] sm:w-full mb-4"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src={image2}
                alt="Charity activity"
                className='border-4 border-white rounded-xl shadow-xl grayscale hover:grayscale-0 transition-all duration-300'
              />
            </motion.div>
            
            {/* Second Floating Image */}
            <motion.div
              className="relative w-[70%] sm:w-full ml-auto"
              animate={{ 
                x: [0, -50, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <img
                src={image3}
                alt="Happy recipients"
                className='border-4 border-white rounded-xl shadow-xl grayscale hover:grayscale-0 transition-all duration-300'
              />
            </motion.div>
          </div>
        </div>
        
        {/* Section Details */}
        <div className="pt-10 lg:pt-0">
          <div>
            <SectionSubHeading text={'Welcome to Cozy Kindness'} />
            <SectionHeading text={'Transforming Lives, One Donation At A Time'} />
            <p className="text-lg text-gray-600 mb-8">
              Make a difference in moments. Our secure online donation platform makes it easy to give—with multiple payment options and the flexibility to choose one-time or recurring contributions. Your generosity directly fuels our mission and touches lives in need.
            </p>
          </div>

          {/* Features Section */}
          <div>   
            <div className="flex gap-5 sm:gap-7 py-5 items-center group">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <img 
                  src={fundRaising} 
                  alt="Fundraising icon" 
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-x-[-1]" 
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl">Fund Raising</h1>
                <p className="text-gray-600 text-sm sm:text-base">Experience the real impact of our work through the voices of those we've empowered.</p>
              </div>
            </div>
            
            <div className="flex gap-5 sm:gap-7 py-5 items-center group">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <img 
                  src={donation} 
                  alt="Donation icon" 
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-x-[-1]" 
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl">Donation Making</h1>
                <p className="text-gray-600 text-sm sm:text-base">Each story reflects the power of your support and the unwavering resilience of our communities.</p>
              </div>
            </div>
            
            <Link to={'/about'}>
                <motion.button 
                className="btn rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-none px-6 py-4 sm:px-8 sm:py-6 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About More
              </motion.button>
            </Link>
            
          </div>
        </div>
      </div>

      {/* StatsSection */}
      <Stats/>
    </div>
  );
};

export default DonateCharity;