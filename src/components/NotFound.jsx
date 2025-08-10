import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-4">
            <main
                role="main"
                aria-labelledby="page-title"
                className="w-full max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 bg-white/80 backdrop-blur-sm shadow-lg ring-1 ring-blue-100"
            >
                <div className="flex flex-col lg:flex-row items-center gap-8">

                    <div className="flex-shrink-0 w-full lg:w-1/2 flex items-center justify-center">
                        <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-xl bg-gradient-to-tr from-indigo-100 to-pink-100 flex items-center justify-center shadow-inner transform transition-transform duration-700 hover:scale-[1.02]">

                            <svg
                                viewBox="0 0 500 500"
                                className="w-56 h-56 sm:w-72 sm:h-72"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id="g1" x1="0" x2="1">
                                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.95" />
                                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.95" />
                                    </linearGradient>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <circle cx="250" cy="250" r="220" fill="url(#g1)" opacity="0.12" />
                                    <path
                                        d="M150 330c25-70 120-150 200-110 80 40 50 150-40 170-90 20-190-40-160-60z"
                                        fill="#fff"
                                        opacity="0.18"
                                    />
                                    <g transform="translate(120 80)">
                                        <text
                                            x="0"
                                            y="220"
                                            fontSize="120"
                                            fontWeight="700"
                                            fill="#0f172a"
                                            fillOpacity="0.12"
                                            style={{ fontFamily: 'Inter, system-ui, Arial' }}
                                        >
                                            404
                                        </text>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>


                    <div className="w-full lg:w-1/2">
                        <h1
                            id="page-title"
                            className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3"
                        >
                            Page not found
                        </h1>

                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Oops — we couldn’t find the page you were looking for. It might have been moved,
                            renamed, or doesn’t exist. Don’t worry — you can go back to the homepage or
                            explore recent queries instead.
                        </p>

                        <div className="flex flex-wrap gap-3 items-center">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold shadow-sm transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                aria-label="Go to homepage"
                            >
                                ← Back to Home
                            </Link>

                            <Link
                                to="/queries"
                                className="inline-flex items-center gap-2 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-md font-medium bg-white hover:bg-indigo-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                aria-label="View all queries"
                            >
                                Browse Queries
                            </Link>

                            <button
                                onClick={() => window.location.reload()}
                                className="ml-2 text-sm text-slate-500 hover:text-slate-700 transition"
                                aria-label="Reload page"
                            >
                                Try reloading ↻
                            </button>
                        </div>

                        <div className="mt-6 text-sm text-slate-400">
                            Tip: If you reached this from a link, it might be outdated. Try searching from the
                            homepage.
                        </div>
                    </div>
                </div>

                <footer className="mt-8 text-center text-xs text-slate-300">
                    © {new Date().getFullYear()} PickBetter — Community product recommendations
                </footer>
            </main>
        </div>
    );
};

export default NotFound;
