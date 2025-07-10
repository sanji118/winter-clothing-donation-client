import { motion } from "framer-motion";
import WavyText from "../../components/ui/WavyText";

const MissionSection = () => {
  return (
    <motion.section 
      className="mb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-800">
        <WavyText text="Our Mission" />
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-semibold mb-6 text-blue-700">Warming Hearts Across Bangladesh</h3>
          <p className="text-lg mb-4 text-gray-700">
            Cozy Kindness was founded in 2022 with a simple goal: to ensure no one suffers 
            from the cold during winter months. We connect generous donors with vulnerable 
            communities through our network of volunteers.
          </p>
          <p className="text-lg text-gray-700">
            Each winter, thousands in rural Bangladesh face extreme hardship without proper 
            warm clothing. Our platform makes it easy to donate winter garments and see the 
            direct impact of your generosity.
          </p>
        </div>
        
        <div className="lg:w-1/2 relative">
          <img 
            src="/brush-stroke-bg.jpg" 
            alt="Mission illustration" 
            className="w-full rounded-lg shadow-xl"
          />
          <motion.img 
            src="/blue-watercolor-bg.avif" 
            alt="Winter coat donation"
            className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default MissionSection;