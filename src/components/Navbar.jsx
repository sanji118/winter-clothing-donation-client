import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const publicNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donation Campaigns', path: '/donations' },
    { name: 'How to Help', path: '/how-to-help' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div 
        className={`navbar py-0 fixed top-0 z-50 text-white justify-between px-4 lg:px-8 transition-all duration-300 ${scrolled ? 'bg-[#3cc3e83f] shadow-lg' : 'bg-[#3cc2e83a]'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div>
          <motion.img 
            src="./logo.png" 
            alt="CozyKindness" 
            className="w-28 invert" 
            whileHover={{ scale: 1.05 }}
          />
        </div>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex bg-[#40acbb] h-fit rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ul className="flex gap-8 px-8 items-center py-2">
            {publicNavLinks.map((link, index) => (
              <motion.li 
                key={link.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link 
                  to={link.path}
                  className="hover:text-[#1E293B] transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-5 items-center">
              <Link to="/profile">
                <motion.img 
                  src={user?.photoURL === null ? 'https://i.postimg.cc/fRxYb1bm/46389216.jpg' : user.photoURL} 
                  alt={user?.displayName} 
                  className="rounded-full w-12 h-12 border-2 border-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </Link>
              <motion.button 
                className="btn border-none text-white bg-[#1E293B]/90 rounded-lg shadow-none hidden sm:block"
                onClick={signOutUser}
                whileHover={{ scale: 1.05, backgroundColor: "#1E293B" }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={'/auth'} 
                className="btn border-none text-white bg-[#1E293B]/90 rounded-full shadow-none"
              >
                Login
              </Link>
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-white focus:outline-none ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu fixed top-20 right-4 z-40 bg-[#40acbb] rounded-lg shadow-xl overflow-hidden md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col p-4">
              {publicNavLinks.map((link) => (
                <motion.li 
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 px-4"
                >
                  <Link 
                    to={link.path} 
                    className="block text-white hover:text-[#1E293B] transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              {user && (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 px-4"
                >
                  <button 
                    className="block text-white hover:text-[#1E293B] transition-colors duration-200 w-full text-left"
                    onClick={() => {
                      signOutUser();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;