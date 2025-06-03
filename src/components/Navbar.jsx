
import { NavLink } from 'react-router-dom';
import logo from '../../public/logo.jpeg'
const Navbar = () => {
    const navlinks = <>
        <NavLink to={'/'} className="navlink">Home</NavLink>
        <NavLink to={'/campaigns'} className="navlink">Donation Campaigns</NavLink>
        <NavLink to={'/how to help'} className="navlink">How to Help</NavLink>
        <NavLink className="navlink">Dashboard</NavLink>
    </>
  return (
    <div className='px-5 bg-blue-300 '>
        <div class="navbar shadow-sm">
            <div class="flex-1">
                <img src={logo} alt="logo" className='rounded-full w-14'/>
            </div>
            <div class="flex gap-2">
                <div className='flex gap-2 items-center'>
                    <input type="text" placeholder="Search" class="input w-24 md:w-auto" />
                </div>
                
                {/**user section */}
                {/**<div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <a class="justify-between">
                        Profile
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>*/}
            </div>
        </div>


                    <hr></hr>



        <div className='navbar '>
            {/**Dropdown menu */}
            <div class=" md:hidden">
                <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                </div>
                <ul
                    tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {navlinks}
                </ul>
                </div>
            </div>
            <div className='hidden md:flex justify-end w-full'>
                <ul className='flex justify-end items-center gap-5'>
                    {navlinks}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar;