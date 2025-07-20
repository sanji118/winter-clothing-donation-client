import { motion } from "framer-motion";
import { FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import WavyText from "../../components/ui/WavyText";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission (frontend only)
    setTimeout(() => {
      console.log("Form would submit:", formData);
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset submission message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonHover = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(251, 146, 60, 0.4)"
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={container}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-cyan-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={item} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <FaHeart className="text-cyan-400 text-4xl animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 flex mx-auto max-w-fit gap-4">
            Spread Some <WavyText text={'Cozy Kindness'}/>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with questions or just to say hello.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Kind Message</h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
              >
                Thank you! Your message has been received. 💌
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition"
                    placeholder="Your kind words..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
                    isLoading ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Warm Wishes"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Find Us Here</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-cyan-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-cyan-500 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <p className="text-gray-600">hello@cozykindness.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyan-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-cyan-500 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">+1 (555) KIND-NESS</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyan-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-cyan-500 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-gray-600">
                    123 Comfort Lane<br />
                    Kindness City, CK 12345
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="font-semibold text-gray-800 mb-4">Follow the Kindness</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook className="text-xl" />, name: "Facebook" },
                  { icon: <FaInstagram className="text-xl" />, name: "Instagram" },
                  { icon: <FaTwitter className="text-xl" />, name: "Twitter" }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="bg-cyan-50 hover:bg-cyan-100 text-cyan-500 font-medium py-3 px-4 rounded-lg transition flex items-center space-x-2"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;