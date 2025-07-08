import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "../../utils/useGallery";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { motion } from "framer-motion";
import { FaHeart, FaShare, FaCalendarAlt, FaUser, FaCampground } from "react-icons/fa";

const Gallery = () => {
  const { data: photos = [], isLoading, isError } = useQuery({
    queryKey: ["gallery"],
    queryFn: getPhotos,
  });

  if (isLoading) return <LoadingState name="Gallery" />;
  if (isError) return <ErrorState name="Gallery" />;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-hidden">
      {/* Enhanced Banner with Parallax Effect */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-[url(./pageBanners/gallery-banner.jpg)] bg-cover bg-no-repeat bg-center"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
            backgroundAttachment: "fixed"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b9e9c] to-[#1b9e9ca3] opacity-90"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white underdog mb-6">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto">
            Capturing moments, creating memories
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid with Hover Flip Cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#044443] relative inline-block">
            Captured Moments
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b9e9c] to-transparent"></span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {photos.map((photo) => (
            <motion.div 
              key={photo._id} 
              variants={item}
              className="perspective-1000 h-64"
            >
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] hover:[transform:rotateY(180deg)]">
                {/* Front Side (Photo) */}
                <div className="absolute inset-0 overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl [backface-visibility:hidden]">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl flex items-end p-4">
                    <h3 className="text-white font-medium text-lg truncate">{photo.caption}</h3>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-2 bg-white/30 rounded-full backdrop-blur-sm hover:bg-white/50 transition">
                      <FaHeart className="text-white" />
                    </button>
                    <button className="p-2 bg-white/30 rounded-full backdrop-blur-sm hover:bg-white/50 transition">
                      <FaShare className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Back Side (Info) */}
                <div className="absolute inset-0 bg-amber-500 text-white rounded-xl p-6 flex flex-col justify-between shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{photo.caption}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-3 opacity-80" />
                        <p>{photo.date}</p>
                      </div>
                      <div className="flex items-center">
                        <FaCampground className="mr-3 opacity-80" />
                        <p className="truncate">{photo.campaignId}</p>
                      </div>
                      <div className="flex items-center">
                        <FaUser className="mr-3 opacity-80" />
                        <p>{photo.uploadedBy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;