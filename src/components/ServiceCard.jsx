import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const ServiceCard = ({ service }) => {
  const { title, photoUrl, iconPng, description } = service;

  return (
    <div className="group shadow-lg rounded-3xl bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={photoUrl} 
          alt={title} 
          className="w-full p-6 group-hover:grayscale transition-all duration-500" 
        />
        
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
          <div className="bg-white w-52 h-28 rounded-t-full border-t-8 border-yellow-500 group-hover:border-cyan-600 flex items-center justify-center transition-all duration-500">
            <img 
              src={iconPng} 
              alt="" 
              className="h-20 group-hover:scale-x-[-1] transition-transform duration-500" 
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="px-6 pb-8 text-center">
        <h1 className="font-medium text-2xl mb-4 group-hover:text-cyan-600 transition-colors duration-300">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className="btn bg-cyan-500 hover:bg-cyan-600 text-white px-8 rounded-full py-3 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto group-hover:bg-yellow-500">
          Learn More <FaArrowUpRightFromSquare />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;