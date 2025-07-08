import {motion} from 'framer-motion';

const PageBanner = ({image, title, subtitle}) => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div 
          className={`absolute inset-0 bg-cover bg-no-repeat bg-center`}
          style={{
            backgroundImage: `url(${image})`,
            transform: "translateZ(0)",
            willChange: "transform",
            backgroundAttachment: "fixed"
          }}
        />
        <div className="absolute inset-0 bg-[#835712c9]"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white underdog mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>
      </div>
  )
}

export default PageBanner;