
import MissionSection from "../../components/About/MIssionSection";
import image from '../../../public/pageBanners/about-page-banner.jpg';
import PageBanner from "../../components/ui/PageBanner";
import Stats from "../../components/Stats";


const AboutUs = () => {
  return (
    <div>
      <PageBanner
      title="About Cozy Kindness" 
      subtitle="Bringing Warmth to Those in Need"
      image={image}
      />
      <div className="p-5 md:p-20">
        <MissionSection/>
        <Stats/>
      </div>
    </div>
  );
};

export default AboutUs;