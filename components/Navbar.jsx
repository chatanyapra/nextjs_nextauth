import { useState, useEffect, useRef } from 'react';
import { logo } from "../utils/imagesGallery";
import { FaHouse, FaCircleInfo, FaBriefcase, FaBookOpenReader } from "react-icons/fa6";
import { gsap } from "gsap";
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef(null);
    const logoAnim = useRef(null);
    const location = useLocation(); 

    useEffect(() => {
        gsap.fromTo(
            logoAnim.current,
            { y: "-100vw" },
            { y: "0vw", duration: 1, delay: 3.3, ease: "power3.out" }
        );
        gsap.fromTo(
            ".tab-menu",
            { y: "100vw" },
            { y: "0vw", duration: 1, delay: 4, ease: "power3.out" }
        );

        const handleScroll = () => {
            const position = window.scrollY;
            setIsScrolled(position >= 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav ref={navbarRef} className={`relative md:fixed flex flex-col top-0 left-0 w-full p-3 main-color transition-opacity duration-300 ease-out z-20 ${isScrolled ? 'navbar-animation' : ''}`}>
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a ref={logoAnim} href="#" className="flex items-center">
                        <img src={logo} className='h-14' style={{ filter: "drop-shadow(0 0 30px black)" }} alt="" />
                    </a>
                    <div className='flex'>
                        <div className="hidden md:flex space-x-4 mt-2 ">
                            <Link to="/"
                                className={`px-3 py-2 rounded-md text-base font-medium drop-shadow-lg ${location.pathname === '/' ? 'text-blue-600' : 'text-white dark:text-black hover:text-blue-400'}`}
                            >
                                Home
                            </Link>
                            <Link to="/about"
                                className={`px-3 py-2 rounded-md text-base font-medium drop-shadow-lg ${location.pathname === '/about' ? 'text-blue-600' : 'text-white dark:text-black hover:text-blue-400'}`}
                            >
                                About
                            </Link>
                            <Link to="/work"
                                className={`px-3 py-2 rounded-md text-base font-medium drop-shadow-lg ${location.pathname === '/work' ? 'text-blue-600' : 'text-white dark:text-black hover:text-blue-400'}`}
                            >
                                Work
                            </Link>
                            <Link to="/blogs"
                                className={`px-3 py-2 rounded-md text-base font-medium drop-shadow-lg ${location.pathname === '/blogs' ? 'text-blue-600' : 'text-white dark:text-black hover:text-blue-400'}`}
                            >
                                Blogs
                            </Link>
                        </div>
                        <div className='px-3 py-2 rounded-md text-base font-medium mt-1'>
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <nav className='tab-menu w-full fixed bottom-3 z-20 md:hidden flex flex-wrap justify-between items-center mx-auto transition-opacity duration-300 px-2'>
                <div className='container flex flex-wrap justify-around items-center mx-auto main-color rounded-full py-3 text-3xl text-white dark:text-gray-900'>
                    <Link to="/">
                        <FaHouse className={`icon-shadow ${location.pathname === '/' ? 'text-blue-500' : ''}`} />
                    </Link>
                    <Link to="/about">
                        <FaCircleInfo className={`icon-shadow ${location.pathname === '/about' ? 'text-blue-500' : ''}`} />
                    </Link>
                    <Link to="/work">
                        <FaBriefcase className={`icon-shadow ${location.pathname === '/work' ? 'text-blue-500' : ''}`} />
                    </Link>
                    <Link to="/blogs">
                        <FaBookOpenReader className={`icon-shadow ${location.pathname === '/blogs' ? 'text-blue-500' : ''}`} />
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
