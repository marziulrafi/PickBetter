import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { useTheme } from '../provider/ThemeProvider';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useTheme();

    const baseLinkClass = "font-semibold transition duration-300 px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-800 dark:hover:text-blue-200 dark:text-gray-200";

    const links = (
        <>
            <li><NavLink to="/" className={baseLinkClass}>Home</NavLink></li>
            <li><NavLink to="/queries" className={baseLinkClass}>Queries</NavLink></li>
        </>
    );

    const userLinks = (
        <>
            <li><NavLink to="/" className={baseLinkClass}>Home</NavLink></li>
            <li><NavLink to="/add-query" className={baseLinkClass}>Add Query</NavLink></li>
            <li><NavLink to="/queries" className={baseLinkClass}>Queries</NavLink></li>
            <li><NavLink to="/recommendations-for-me" className={baseLinkClass}>Recommendations For Me</NavLink></li>
            <li><NavLink to="/my-queries" className={baseLinkClass}>My Queries</NavLink></li>
            <li><NavLink to="/my-recommendations" className={baseLinkClass}>My Recommendations</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 px-4 transition-colors duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white dark:bg-gray-700 rounded-box w-60"
                    >
                        {user ? userLinks : <>
                            {links}
                            <li><NavLink to="/join" className={baseLinkClass}>Join</NavLink></li>
                        </>}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2 ml-2">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-300 tracking-wide">PickBetter</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-2">
                    {user ? userLinks : links}
                </ul>
            </div>

            <div className="navbar-end flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-circle dark:text-yellow-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>

                {user ? (
                    <button
                        onClick={logOut}
                        className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/join" className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110 transition">
                        Join
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
