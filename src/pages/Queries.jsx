import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../components/Loading';

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [layout, setLayout] = useState(3);

    useEffect(() => {
        fetch('http://localhost:3000/queries')
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setQueries(sorted);
                setFilteredQueries(sorted);
            });
    }, []);

    useEffect(() => {
        const filtered = queries.filter(query =>
            query.productName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredQueries(filtered);
    }, [searchText, queries]);


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
                                className="inline-block mt-auto text-center bg-blue-600 text-white text-xs sm:text-sm md:text-base px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Recommend 💡
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Queries;
