import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";

const DonationCard = ({ donation }) => {
  const { title, image, raised, goal, division, status } = donation;
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md max-w-sm mx-auto">
      
      <div className="relative">
        <motion.img
          src={image}
          alt={title}
          className="rounded-xl w-full h-48 object-cover"
          whileHover={{ scale: 1.02 }}
        />
        <div className="absolute top-3 right-3 bg-amber-600 text-white text-sm font-semibold px-2 py-1 rounded-full">
          {Math.floor(progress)}%
        </div>
      </div>

      
      <h2 className="text-lg font-semibold text-gray-800 mt-4">{title}</h2>

      
      <div className="mt-4">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-cyan-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Raised - ${raised.toLocaleString()}</span>
          <span className="text-cyan-600 font-semibold">
            Goal - ${goal.toLocaleString()}
          </span>
        </div>
      </div>

      
      <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
        <div className="flex items-center gap-1">
          <FiMapPin size={14} />
          <span>{division}</span>
        </div>
        <span
          className={`font-bold ${
            status === "Active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {status}
        </span>
      </div>

      
      <Link to={'/donate'}><button className="mt-5 flex items-center gap-2 bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg transition">
        Donate Now <ArrowRight size={16} />
      </button></Link>
    </div>
  );
};

export default DonationCard;
