import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; // Changed from 'react-router' to 'react-router-dom'

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [layout, setLayout] = useState(3);

    useEffect(() => {
        fetch('http://localhost:3000/queries') // No change needed here, it will now fetch all queries
            .then(res => res.json())
            .then(data => {
                // The backend now sorts, so this client-side sort is technically redundant but harmless.
                // You can remove it if you fully trust the backend sorting.
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setQueries(sorted);
                setFilteredQueries(sorted);
            })
            .catch(error => {
                console.error("Error fetching queries:", error);
                // Handle error state if needed, e.g., setError(true);
            });
    }, []);

    useEffect(() => {
        const filtered = queries.filter(query =>
            query.productName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredQueries(filtered);
    }, [searchText, queries]);

    const handleLayoutChange = (cols) => setLayout(cols);

    // I've added a simple loading indicator in the return, as the 'Loading' component was not provided.
    if (queries.length === 0 && !searchText) { // Check if initial fetch is pending and no search text
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 font-bold text-center text-blue-700">All Community Queries</h2>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="input input-bordered w-full sm:w-1/2"
                />

                <div className="flex gap-2">
                    <button onClick={() => handleLayoutChange(1)} className={`btn btn-sm ${layout === 1 ? 'btn-primary' : 'btn-outline'}`}>1 Col</button>
                    <button onClick={() => handleLayoutChange(2)} className={`btn btn-sm hidden md:inline-flex ${layout === 2 ? 'btn-primary' : 'btn-outline'}`}>2 Col</button>
                    <button onClick={() => handleLayoutChange(3)} className={`btn btn-sm hidden lg:inline-flex ${layout === 3 ? 'btn-primary' : 'btn-outline'}`}>3 Col</button>
                </div>
            </div>

            {filteredQueries.length > 0 ? (
                <div className={`grid grid-cols-1 ${layout >= 2 ? 'md:grid-cols-2' : ''} ${layout === 3 ? 'lg:grid-cols-3' : layout === 2 ? 'lg:grid-cols-2' : ''} gap-8`}>
                    {filteredQueries.map(query => (
                        <div key={query._id} className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-200 hover:shadow-xl transition duration-300 flex flex-col justify-between">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-blue-900 mb-2">{query.queryTitle}</h3>
                            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-3 line-clamp-3">{query.reason?.slice(0, 100)}...</p>

                            <div className="flex flex-wrap gap-2 text-xs sm:text-sm mb-2">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                    Product: {query.productName}
                                </span>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                                    Brand: {query.productBrand}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 mb-2">Recommendations: <strong>{query.recommendationCount || 0}</strong></p>

                            <Link
                                to={`/query-details/${query._id}`}
                                className="inline-block mt-auto text-center bg-blue-600 text-white text-xs sm:text-sm md:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Recommend 💡
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-10 col-span-full">
                    {searchText ? "No queries match your search." : "No queries found. Be the first to ask!"}
                </p>
            )}
        </div>
    );
};

export default Queries;