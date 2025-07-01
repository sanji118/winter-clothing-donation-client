import fundRaising from '../../assets/fundraiser.png';
import donation from '../../assets/donation.png';
import image1 from '../../assets/donate-charity-1.png';
import image2 from '../../assets/donate-charity-2.jpg';
import image3 from '../../assets/donate-charity-3.jpg';
import { motion } from 'framer-motion';

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
            <p className="underdog italic text-cyan-600 font-bold text-xl">Welcome to Cozy Kindness</p>
            <h1 className="text-4xl sm:text-5xl font-bold my-6">
              Transforming Lives, One Donation At A Time
            </h1>
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
            
            <motion.button 
              className="btn rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shadow-none px-6 py-4 sm:px-8 sm:py-6 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About More
            </motion.button>
          </div>
        </div>
      </div>

      {/* StatsSection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 py-10">
        {/* Volunteers Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-cyan-800 text-3xl sm:text-4xl">15k+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Incredible Volunteers</div>
        </motion.div>

        {/* Campaigns Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-yellow-500 text-3xl sm:text-4xl">1k+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Successful Campaigns</div>
        </motion.div>

        {/* Donors Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-cyan-800 text-3xl sm:text-4xl">400+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Monthly Donors</div>
        </motion.div>

        {/* Team Support Stat */}
        <motion.div 
          className="stat place-items-center text-center p-4"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-value text-yellow-500 text-3xl sm:text-4xl">35k+</div>
          <div className="stat-title text-gray-600 text-sm sm:text-base">Team Support</div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonateCharity;