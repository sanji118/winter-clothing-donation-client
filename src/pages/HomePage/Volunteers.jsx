import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../hook/axiosInstance";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from "react-router-dom";
import SectionSubHeading from "../../components/ui/SectionSubHeading";
import SectionHeading from "../../components/ui/SectionHeading";

const Volunteers = () => {
  const { data: volunteers = [], isLoading, isError, error } = useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/volunteers");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-5 md:p-20">
      <SectionSubHeading text={'Meet Our Volunteers'} />
      <SectionHeading text={'Bright Minds, Big Hearts'} />

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {volunteers.map((volunteer, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center px-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-b-4 border-cyan-950 hover:border-amber-500 transition-all duration-300 group">
                <img
                  src={volunteer.photo}
                  alt={volunteer.name}
                  className="w-80 h-80 object-cover group-hover:grayscale transition duration-300"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex gap-3">
                  <div className="p-2 rounded-full hover:scale-110 transition bg-amber-400">
                    <Link to={`/volunteers/${idx}`}><FaPlus className="text-white" /></Link>
                  </div>
                </div>
              </div>
              <div className="text-center my-4">
                <h2 className="text-xl font-bold">{volunteer.name}</h2>
                <p className="opacity-70 text-xs">
                  Volunteer as {volunteer.contribution.role}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Volunteers;