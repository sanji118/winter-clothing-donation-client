import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaBehance,
  FaVimeoV,
  FaPaperPlane,
  FaArrowUpRightDots
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="relative bg-[#375b52] text-white overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <img src="./logo.png" alt="Logo" className="w-28" />
          </div>
          <p className="text-gray-300 mb-6">
            Our secure online donation platform allows you to make contributions quickly
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-[#40acbb] p-2 rounded-full text-white text-lg">
              <FaPhone />
            </span>
            <div>
              <p className="text-xs text-gray-400">Call us any time:</p>
              <p className="font-semibold">+163-3654-7896</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-yellow-500 p-2 rounded-full text-white text-lg">
              <FaEnvelope />
            </span>
            <div>
              <p className="text-xs text-gray-400">Email us any time:</p>
              <p className="font-semibold">info@cozykindness.com</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-1">Quick Links</h3>
          <div className="w-8 h-0.5 bg-yellow-500 mb-4"></div>
          <ul className="space-y-3">
            {['About Us', 'Our News', 'Our Campaign', 'Privacy policy', 'Contact Us'].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition">
                <FaArrowUpRightDots className="text-yellow-500" />
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-bold mb-1">Our Service</h3>
          <div className="w-8 h-0.5 bg-yellow-500 mb-4"></div>
          <ul className="space-y-3">
            {['Give Donation', 'Education Support', 'Food Support', 'Health Support', 'Our Campaign'].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition">
                <FaArrowUpRightDots className="text-yellow-500" />
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-1">Newsletter</h3>
          <div className="w-8 h-0.5 bg-yellow-500 mb-4"></div>
          <p className="text-gray-300 mb-4 text-sm">
            Subscribe to Our Newsletter. Regular inspection and feedback mechanisms
          </p>
          <form className="flex mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-l-full px-4 py-2 w-full text-gray-800 bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#40acbb] hover:bg-[#349aa8] rounded-r-full px-5 flex items-center justify-center"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </form>
          <div className="flex gap-3">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance, FaVimeoV].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#40acbb] transition">
                <Icon className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#40acbb] py-4 text-center text-sm text-white">
        Copyright 2025 <span className="text-yellow-200 font-bold">Cozy Kindness</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
