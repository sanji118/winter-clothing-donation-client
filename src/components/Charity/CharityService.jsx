import ServiceCard from './ServiceCard';
import SectionHeading from '../ui/SectionHeading';
import SectionSubHeading from '../ui/SectionSubHeading';

const CharityService = () => {
    const services = [
    {
        title: "Winter Clothing Drive",
        description: "Help vulnerable communities stay warm this winter by donating coats, sweaters, and blankets.",
        photoUrl: "https://i.postimg.cc/y85d70LF/children.avif",
        iconPng: "https://i.postimg.cc/15hb1X0f/coat.png"
    },
    {
        title: "Volunteer Network",
        description: "Join our team to distribute winter essentials in rural and low-income areas.",
        photoUrl: "https://i.postimg.cc/m2mk6vMp/donation.webp",
        iconPng: "https://i.postimg.cc/TYVFdxQQ/partners.png"
    },
    {
        title: "Donation Tracker",
        description: "See real-time impact of your donations through our transparent tracking system.",
        photoUrl: "https://i.postimg.cc/134Xxvrm/handwrittengive.webp",
        iconPng: "https://i.postimg.cc/v86CKfVJ/analysis.png"
    },
    {
        title: "Warmth Kits",
        description: "Sponsor pre-packaged kits with blankets, socks and hats for remote areas.",
        photoUrl: "https://i.postimg.cc/rFVzjVdt/makeachange.avif",
        iconPng: "https://i.postimg.cc/j2N9JYTx/boxes.png"
    }
    ]
  return (
    <div className='p-5 md:p-20 bg-[url(./charity-service-bg.png)] bg-no-repeat bg-cover'>
        <div className='text-center'>
            <SectionSubHeading text={'Charity Service'} />
            <SectionHeading text={'For People. With Purpose. Guided by Humanity.'} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto h-fit'>
            {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
            ))}
        </div>
    </div>
  )
}

export default CharityService;