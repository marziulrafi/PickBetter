import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [layout, setLayout] = useState(3);

    useEffect(() => {
        fetch('https://pick-better-server.vercel.app/queries')
            .then(res => res.json())
            .then(data => {

                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setQueries(sorted);
                setFilteredQueries(sorted);
            })
            .catch(error => {
                console.error("Error fetching queries:", error);

            });
    }, []);

    useEffect(() => {
        const filtered = queries.filter(query => {
            const matchesSearch = query.productName.toLowerCase().includes(searchText.toLowerCase()) ||
                query.queryTitle.toLowerCase().includes(searchText.toLowerCase());
            const matchesBrand = selectedBrand === '' || query.productBrand.toLowerCase() === selectedBrand.toLowerCase();
            return matchesSearch && matchesBrand;
        });
        setFilteredQueries(filtered);
    }, [searchText, selectedBrand, queries]);

    const uniqueBrands = [...new Set(queries.map(query => query.productBrand))].filter(Boolean).sort();

    const handleLayoutChange = (cols) => setLayout(cols);

    const copyQueryLink = async (queryId) => {
        const queryUrl = `${window.location.origin}/query-details/${queryId}`;
        try {
            await navigator.clipboard.writeText(queryUrl);
            toast.success('Query link copied to clipboard!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast.error('Failed to copy link', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    if (queries.length === 0 && !searchText) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-bold text-center text-blue-700 dark:text-blue-300">All Community Queries</h2>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-2/3">
                    <input
                        type="text"
                        placeholder="Search by product name or title..."
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        className="input input-bordered flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <select
                        value={selectedBrand}
                        onChange={e => setSelectedBrand(e.target.value)}
                        className="select select-bordered w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                        <option value="">All Brands</option>
                        {uniqueBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2">
                    <button onClick={() => handleLayoutChange(1)} className={`btn btn-sm ${layout === 1 ? 'btn-primary' : 'btn-outline'}`}>1 Col</button>
                    <button onClick={() => handleLayoutChange(2)} className={`btn btn-sm hidden md:inline-flex ${layout === 2 ? 'btn-primary' : 'btn-outline'}`}>2 Col</button>
                    <button onClick={() => handleLayoutChange(3)} className={`btn btn-sm hidden lg:inline-flex ${layout === 3 ? 'btn-primary' : 'btn-outline'}`}>3 Col</button>
                </div>
            </div>

            {filteredQueries.length > 0 ? (
                <div className={`grid grid-cols-1 ${layout >= 2 ? 'md:grid-cols-2' : ''} ${layout === 3 ? 'lg:grid-cols-3' : layout === 2 ? 'lg:grid-cols-2' : ''} gap-8`}>
                    {filteredQueries.map(query => (
                        <div key={query._id} className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 hover:shadow-xl transition duration-300 flex flex-col justify-between">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-900 dark:text-blue-200 mb-2">{query.queryTitle}</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{query.reason?.slice(0, 100)}...</p>

                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-2">
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                                    Product: {query.productName}
                                </span>
                                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full">
                                    Brand: {query.productBrand}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">Recommendations: <strong>{query.recommendationCount || 0}</strong></p>

                            <div className="flex gap-2 mt-auto">
                                <Link
                                    to={`/query-details/${query._id}`}
                                    className="flex-1 text-center bg-blue-600 text-white text-xs sm:text-sm md:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                    Recommend 💡
                                </Link>
                                <button
                                    onClick={() => copyQueryLink(query._id)}
                                    className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white px-3 py-2 rounded-full transition text-sm"
                                    title="Copy link to share"
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-10 col-span-full">
                    {searchText ? "No queries match your search." : "No queries found. Be the first to ask!"}
                </p>
            )}
        </div>
    );
};

export default Queries;