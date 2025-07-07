import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-10 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div className='bg-cyan-800 rounded-full p-2 w-12 h-12 text-white absolute right-0 top-0 flex items-center justify-center'><FaSearch className="" /></div>
    </div>
  );
};

export default Searchbar;
