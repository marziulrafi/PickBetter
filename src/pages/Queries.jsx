import React from 'react';
import { Link, useLoaderData } from 'react-router';

const Queries = () => {
    const queries = useLoaderData();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">🔥 Community Product Queries</h2>
            
            {queries && queries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {queries.map(query => (
                        <div
                            key={query._id}
                            className="rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-200 hover:shadow-xl transition duration-300"
                        >
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">{query.queryTitle}</h3>
                            
                            <p className="text-gray-700 mb-3 line-clamp-3">{query.reason?.slice(0, 100)}...</p>

                            <div className="flex flex-wrap gap-2 text-sm mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                    Product: {query.productName}
                                </span>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                                    Brand: {query.productBrand}
                                </span>
                            </div>

                            <Link
                                to={`/queries/${query._id}`}
                                className="inline-block mt-auto text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                View Full Query
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-20">No queries available right now.</p>
            )}
        </div>
    );
};

export default Queries;
