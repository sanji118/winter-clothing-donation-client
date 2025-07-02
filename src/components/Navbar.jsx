import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import SidebarMenu from "./SidebarMenu";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const publicNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donation Campaigns', path: '/donations' },
    { name: 'How to Help', path: '/how-to-help' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  return (
    <>
      <SidebarMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <motion.div
        className="navbar py-0 fixed top-0 z-50 w-full text-white justify-between px-4 lg:px-8 bg-[#3cc2e83a] flex items-center"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Logo */}
        <motion.img
          src="./logo.png"
          alt="CozyKindness"
          className="w-28 invert"
          whileHover={{ scale: 1.05 }}
        />

        {/* Desktop Nav - only visible on large screens and up */}
        <motion.div
          className="hidden lg:flex bg-[#40acbb] h-fit rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ul className="flex gap-8 px-8 items-center py-2">
            {publicNavLinks.map(link => (
              <motion.li
                key={link.path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-4 items-center">
              <Link to="/profile">
                <motion.img
                  src={user?.photoURL || 'https://i.postimg.cc/fRxYb1bm/46389216.jpg'}
                  alt={user?.displayName}
                  className="rounded-full w-12 h-12 border-2 border-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </Link>
              <motion.button
                className="btn border-none text-white bg-[#1E293B]/90 rounded-lg shadow-none hidden sm:block"
                onClick={signOutUser}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/auth"
                className="btn border-none text-white bg-[#1E293B]/90 rounded-full shadow-none"
              >
                Login
              </Link>
            </motion.div>
          )}

          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="btn bg-[#1E293B] text-white btn-circle border-none lg:hidden shadow-none"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
