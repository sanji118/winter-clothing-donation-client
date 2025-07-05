import { useQuery, useQueryClient } from "@tanstack/react-query"
import SectionHeading from "../ui/SectionHeading"
import SectionSubHeading from "../ui/SectionSubHeading"
import { Swiper, SwiperSlide } from "swiper/react"
import DonationCard from "./DonationCard"
import { Autoplay } from "swiper/modules"
import { getCampaigns } from "../../utils/useCampaigns"



const Donations = () => {
    const queryClient = useQueryClient();
    const {data: donations = [], isLoading, isError, error} = useQuery({
        queryKey: ['/campaigns'],
        queryFn: getCampaigns,
    })

    

    if(isLoading) return <p className="text-cyan-600">Loading...</p>;
    if(isError) return <p>Error: {error.message}</p>

    
  return (
    <div className="bg-[url(./blue-watercolor-bg.avif)] bg-no-repeat bg-cover p-5 md:p-20">
        <div>
            <SectionSubHeading text={'Every Gift Counts — Let’s Give Together'} />
            <SectionHeading text={'Together, we turn kindness into real, lasting change that transforms lives'} />
        </div>
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
            {
                donations.map((donation) =>(
                    <SwiperSlide key={donation._id}>
                        <DonationCard key={donation._id} donation={donation} />
                    </SwiperSlide>
                ))
            }
        </Swiper>

    </div>
  )
}

export default Donations