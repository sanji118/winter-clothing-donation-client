import { motion } from "framer-motion";
import SectionHeading from '../ui/SectionHeading';
import SectionSubHeading from '../ui/SectionSubHeading';
import heart from '../../assets/images/heart.png';

const WorkProcess = () => {
    const workProcessData = [
        {
            id: 1,
            title: "Awareness & Engagement",
            icon: "https://i.postimg.cc/s2n8pKsb/public-relations-unscreen.gif",
            description: "Inform and rally support through campaigns, social media, and outreach programs to engage the community.",
            color: "bg-purple-100"
        },
        {
            id: 2,
            title: "Donation Collection",
            icon: "https://i.postimg.cc/bw94vpMy/clothes-unscreen.gif",
            description: "Securely collect donations via one-time or recurring payments through multiple platforms and gateways.",
            color: "bg-blue-100"
        },
        {
            id: 3,
            title: "Impact & Accountability",
            icon: "https://i.postimg.cc/Qd3RsHfY/analytics-unscreen.gif",
            description: "Allocate funds to meaningful projects with transparent reporting to ensure every donation makes a difference.",
            color: "bg-green-100"
        },
        {
            id: 4,
            title: "Follow-up & Reporting",
            icon: "https://i.postimg.cc/9fXKRs5G/sociology-unscreen.gif",
            description: "Send regular updates, share impact stories, and maintain transparency with all supporters.",
            color: "bg-orange-100"
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <SectionSubHeading text={'How We Work'} />
                    <SectionHeading text={"Here's how we bring your support to life"} />
                    <div className="mt-4 h-1 w-20 bg-cyan-600 mx-auto rounded-full"></div>
                </div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {workProcessData.map((data, index) => (
                        <motion.div 
                            key={data.id}
                            variants={item}
                            whileHover={{ y: -10 }}
                            className={`p-8 rounded-xl shadow-lg hover:shadow-xl hover:grayscale-70 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden ${data.color}`}
                        >
                            <div 
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `url(${heart})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: '150px'
                                }}
                            />
                            
                            {/* Content container */}
                            <div className="relative z-10 h-full flex flex-col items-center">
                                {/* Icon with number */}
                                <div className="relative mb-8">
                                    <div className="absolute -inset-4 bg-white/30 rounded-full"></div>
                                    <img 
                                        src={data.icon} 
                                        alt={data.title} 
                                        className="relative w-16 h-16 object-contain"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-cyan-600 font-bold border-2 border-cyan-100">
                                        {index + 1}
                                    </div>
                                </div>
                                
                                {/* Text content */}
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                                        {data.title}
                                    </h3>
                                    <p className="text-gray-600 mb-0 leading-relaxed">
                                        {data.description}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow between steps (desktop only) */}
                            {index < workProcessData.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 z-10">
                                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors duration-300 shadow-lg hover:shadow-cyan-300">
                        Learn More About Our Process
                    </button>
                </div>
            </div>
        </section>
    );
};

export default WorkProcess;