import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const links = (
        <>
            <li><NavLink to="/" className="font-semibold">Home</NavLink></li>
            <li><NavLink to="/queries" className="font-semibold">Queries</NavLink></li>
            <li><NavLink to="/login" className="font-semibold">Login</NavLink></li>
        </>
    );

    const userLinks = (
        <>
            <li><NavLink to="/" className="font-semibold">Home</NavLink></li>
            <li><NavLink to="/queries" className="font-semibold">Queries</NavLink></li>
            <li><NavLink to="/recommendations" className="font-semibold">Recommendations For Me</NavLink></li>
            <li><NavLink to="/my-queries" className="font-semibold">My Queries</NavLink></li>
            <li><NavLink to="/my-recommendations" className="font-semibold">My Recommendations</NavLink></li>

        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {user ? userLinks : links}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl font-bold">PickBetter</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {user ? userLinks : links}
                </ul>
            </div>

            <div className="navbar-end">
                {user && (
                    <div className="dropdown dropdown-end">
                        <button onClick={logOut} className="btn font-semibold cursor-pointer">Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
