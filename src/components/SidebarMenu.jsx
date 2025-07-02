import { Link } from "react-router-dom";
import { FiX, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

const SidebarMenu = ({ isOpen, setIsOpen }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const menuItems = [
    { title: "Home", path: "/", subLinks: [] },
    {
      title: "About Us",
      subLinks: [
        { name: "Who We Are", path: "/about" },
        { name: "Team", path: "/team" },
      ],
    },
    {
      title: "Donations",
      subLinks: [
        { name: "All Campaigns", path: "/donations" },
        { name: "Donate Now", path: "/donate" },
      ],
    },
    {
      title: "Pages",
      subLinks: [
        { name: "Gallery", path: "/gallery" },
        { name: "Testimonials", path: "/testimonials" },
      ],
    },
    {
      title: "Blog",
      subLinks: [
        { name: "Latest Posts", path: "/blog" },
        { name: "Archives", path: "/archive" },
      ],
    },
    {
      title: "Contact Us",
      path: "/contact",
      subLinks: [],
    },
  ];

  const toggleSection = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <>
      {isOpen && (
        <>
          {/* ✅ Fixed Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[99]"
          />

          {/* ✅ Sidebar now has higher z-index than navbar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 left-0 w-60 h-full bg-white z-[100] shadow-lg overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <img src="./logo.png" alt="Logo" className="w-24" />
              <button onClick={() => setIsOpen(false)}>
                <FiX size={24} className="text-gray-600" />
              </button>
            </div>

            <ul className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.subLinks.length === 0 ? (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full flex justify-between items-center px-2 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        <span>{item.title}</span>
                        <FiChevronDown
                          className={`transition-transform ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openIndex === index && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.subLinks.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={sub.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-2 py-1 text-sm text-gray-600 hover:text-black"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </>
  );
};

export default SidebarMenu;
