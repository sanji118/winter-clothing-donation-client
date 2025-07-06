import { ArrowUpRight, Heart, Mail, Phone } from 'lucide-react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPaperPlane,
} from 'react-icons/fa6';
import whitebrushStroke from '../assets/images/white-brush-stroke.png'

const Footer = () => {

  const icons = [FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube]
  return (
    <footer className="relative bg-[#031f23] text-white overflow-hidden z-10">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid md:grid-cols-2 items-center gap-6 border-b border-white/10 relative">
        <div className='absolute w-40 h-40 top-0'><img src={whitebrushStroke} alt="" /></div>
        <div>
          <h2 className="text-3xl font-bold mb-2">Subscribe To Our Newsletter</h2>
          <p className="text-gray-300 text-sm">
            Regular inspections and feedback mechanisms
          </p>
        </div>
        <form className="flex max-w-lg w-full">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="rounded-l-full px-6 py-3 w-full text-gray-800 bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-400 px-6 rounded-r-full flex items-center justify-center"
          >
            <FaPaperPlane className="text-white text-xl" />
          </button>
        </form>
      </div>

      {/* Footer Main */}
      <div className="max-w-7xl mx-auto p-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <img src="./logo.png" alt="Logo" className="w-28" />
          </div>
          <p className="text-gray-300 mb-6">
            Our secure online donation platform allows you to make contributions quickly and safely. Choose from various.
          </p>
          <button className="bg-[#40acbb] text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-[#349aa8]">
            <span className="text-white text-lg"><Heart className='fill-white text-white'/></span> Donate Now
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <div className="w-8 h-0.5 bg-yellow-500 mb-4"></div>
          <ul className="space-y-3 text-gray-300 text-sm">
            {['About Us', 'Our News', 'Our Campaign', 'Privacy policy', 'Contact Us'].map((item, index) => (
              <li key={index}>
                <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition">
                  <ArrowUpRight className="text-yellow-500 w-4 h-4" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-bold mb-2">Our Service</h3>
          <div className="w-8 h-0.5 bg-yellow-500 mb-4"></div>
          <ul className="space-y-3 text-gray-300 text-sm">
            {['Give Donation', 'Education Support', 'Food Support', 'Health Support', 'Our Campaign'].map((item, index) => (
              <li key={index}>
                <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition">
                  <ArrowUpRight className="text-yellow-500 w-4 h-4" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className='grid grid-cols-6 bg-[#0a434b] rounded-4xl border border-[#30757f]'>
          <div className='col-span-5 p-5'>
            <h1 className='font-bold text-2xl py-3'>Contact Us</h1>
            <div className='flex items-center gap-2 mb-5'>
              <div className='bg-[#4faab9] p-3 rounded-full'><Phone/></div>
              <div>
                <p className='opacity-80 text-sm'>Call us any time:</p>
                <h2 className='font-bold text-xl'>+8801234567891</h2>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='bg-[#4faab9] p-3 rounded-full'><Mail/></div>
              <div>
                <p className='opacity-80 text-sm'>Email us any time:</p>
                <h2 className='font-bold text-xl'>info@cozykindess.com</h2>
              </div>
            </div>
          </div>
          {/* Social icons */}
          <div className='rounded-4xl border border-[#30757f] bg-[#1f6871] flex flex-col gap-3 py-3 items-center'>
            {
              icons.map(( Icon, idx )=> (
                <div key={idx} className='rounded-full bg-white w-10 h-10'><Icon className='runded-full text-gray-800 w-10 h-10 p-2'/></div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-[#40acbb] py-4 text-center text-sm text-white">
        Copyright 2025 <span className="text-yellow-200 font-bold">Cozy Kindness</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
