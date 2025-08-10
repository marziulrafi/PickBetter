import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const baseLinkClass = "font-semibold transition duration-300 px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600";

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
        <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-60"
                    >
                        {user ? userLinks : <>
                            {links}
                            <li><NavLink to="/join" className={baseLinkClass}>Join</NavLink></li>
                        </>}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2 ml-2">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <span className="text-xl font-bold text-blue-700 tracking-wide">PickBetter</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-2">
                    {user ? userLinks : links}
                </ul>
            </div>


            <div className="navbar-end">
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
