
import MissionSection from "../../components/About/MIssionSection";
import image from '../../../public/pageBanners/about-page-banner.jpg';
import PageBanner from "../../components/ui/PageBanner";
import Stats from "../../components/Stats";
import TestimonialSection from "../../components/TestimonialSection";
import WorkProcess from "../../components/About/WorkProcess";


const AboutUs = () => {
  return (
    <div>
      <PageBanner
      title="About Cozy Kindness" 
      subtitle="Bringing Warmth to Those in Need"
      image={image}
      />
      <div>
        <MissionSection/>
        <div className="p-5 md:p-20">
          <Stats/>
          <WorkProcess/>
        </div>
        <TestimonialSection/>
      </div>
    </div>
  );
};

export default AboutUs;