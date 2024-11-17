import React, { useState } from 'react';
import { navLinks } from "../constants/index.js";

// NavItem component for rendering individual links
const NavItem = () => {
    return (
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
                <li key={id} className="nav-li">
                    <a href={href} className="nav-li_a" onClick={() => {}}>
                        {name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

// Navbar component for the main navigation bar
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle function for mobile menu
    const toggleMenu = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto">
                    <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
                        Priyanshu Satapathy
                    </a>

                    <button onClick={toggleMenu} className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
                        <img
                            src={isOpen ? "https://logowik.com/content/uploads/images/close1437.jpg" : "https://th.bing.com/th/id/OIP.bjUh2ly3cJDfFh5lPoZmzQAAAA?w=256&h=256&rs=1&pid=ImgDetMain"}
                            alt="toggle"
                            className="w-6 h-6"
                        />
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="sm:flex hidden">
                        <NavItem />
                    </nav>
                </div>

                {/* Mobile Navigation */}
               <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                   <nav className="p-5">
                       <NavItem />
                   </nav>
               </div>
            </div>
        </header>
    );
};

export default Navbar;
