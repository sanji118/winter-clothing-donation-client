import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import chartsAnimation from '../../public/animations/Charts.json';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useInView } from 'react-intersection-observer';

const Stats = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [animationStarted, setAnimationStarted] = useState(false);

  const [cards, setCards] = useState([
    { 
      id: 1, 
      value: "15k+", 
      title: "Incredible\nVolunteers",
      color: "bg-green-100",
      textColor: "text-green-800"
    },
    { 
      id: 2, 
      value: "1k+", 
      title: "Successful\nCampaigns", 
      color: "bg-blue-100",
      textColor: "text-blue-800"
    },
    { 
      id: 3, 
      value: "400+", 
      title: "Monthly\nDonors", 
      color: "bg-purple-100",
      textColor: "text-purple-800"
    },
    {
      id: 4,
      value: "35k+",
      title: "Team Support",
      color: "bg-orange-100",
      textColor: "text-orange-900"
    }
  ]);

  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
      controls.start('visible');
    }
  }, [controls, inView, animationStarted]);

  const removeCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
    setTimeout(() => {
      setCards(prev => {
        const removedCard = cards.find(c => c.id === id);
        return [...prev, { ...removedCard, id: Date.now() }];
      });
    }, 1000);
  };

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center justify-between min-h-[400px] gap-8">
      {/* Cards Section */}
      <div className="relative w-full max-w-md h-[300px] flex items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              layoutId={`card-${card.id}`}
              className={`border-b-4 absolute w-full max-w-sm rounded-2xl p-8 shadow-md cursor-grab ${card.color} ${card.textColor}`}
              style={{
                zIndex: index + 1,
                top: index * 30
              }}
              drag="x"
              dragConstraints={{ left: -50, right: 50 }}
              onDragEnd={(_, info) => Math.abs(info.offset.x) > 50 && removeCard(card.id)}
              initial={{ y: 100, opacity: 0 }}
              animate={animationStarted ? { y: 0, opacity: 1 } : {}}
              exit={{ x: 300 * (Math.random() > 0.5 ? 1 : -1), opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: index * 0.1
              }}
              whileHover={{ scale: 1.03, zIndex: cards.length + 1 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="h-full flex flex-col justify-center items-start">
                <motion.h3
                  className="text-5xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  animate={animationStarted ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {card.value}
                </motion.h3>
                <motion.p
                  className="text-xl whitespace-pre-line"
                  initial={{ opacity: 0 }}
                  animate={animationStarted ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {card.title}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lottie Section */}
      <motion.div
        className="w-full md:w-1/2 lg:w-2/5"
        initial={{ opacity: 0, y: 30 }}
        animate={animationStarted ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Lottie
          animationData={chartsAnimation}
          loop={true}
          className="max-h-96"
        />
        <motion.p
          className="text-center text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={animationStarted ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          Our growth and impact visualized
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Stats;
