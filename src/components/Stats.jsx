import { motion, AnimatePresence } from 'framer-motion';
import chartsAnimation from '../../public/animations/Charts.json';
import { useState } from 'react';
import Lottie from 'lottie-react';

const Stats = () => {
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

  const removeCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
    setTimeout(() => setCards(prev => [...prev, cards.find(c => c.id === id)]), 1000);
  };

  return (
    <div className="flex items-center justify-between min-h-[400px]">
        <div className="relative w-full max-w-md h-[300px]">
            <AnimatePresence>
            {cards.map((card, index) => (
                <motion.div
                key={card.id}
                className={`border-b-4 absolute w-full max-w-sm rounded-2xl p-8 shadow-md ${card.color} ${card.textColor}`}
                style={{ 
                    zIndex: index + 1,
                    height: '220px',
                    top: index * 30
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => Math.abs(info.offset.x) > 100 && removeCard(card.id)}
                initial={{ y: 100, opacity: 0 }}
                animate={{ 
                    y: 0,
                    opacity: 1 
                }}
                exit={{ x: 300, opacity: 0 }}
                transition={{
                    type: 'tween',
                    ease: 'easeOut',
                    duration: 0.7,
                    delay: index * 0.6
                }}
                whileHover={{ 
                    y: -10,
                    zIndex: cards.length + 1
                }}
                >
                <div className="h-full flex flex-col justify-center items-start">
                    <h3 className="text-5xl font-bold mb-2">{card.value}</h3>
                    <p className="text-xl whitespace-pre-line">{card.title}</p>
                </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
        <motion.div 
        className="w-full md:w-1/2 lg:w-2/5"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        >
            <Lottie 
            animationData={chartsAnimation} 
            loop={true}
            className="max-h-96"
            />
            <p className="text-center text-gray-600 mt-4">
            Our growth and impact visualized
            </p>
        </motion.div>
    </div>
  );
};

export default Stats;