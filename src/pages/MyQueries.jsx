import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const [myQueries, setMyQueries] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/queries?email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyQueries(data));
        }
    }, [user]);



    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete your query.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:3000/queries/${id}`, {
                        method: 'DELETE'
                    }).then(res => res.json())
                        .then(() => {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your query has been removed.',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            });


                            setMyQueries(prev => prev.filter(q => q._id !== id));
                        });

                }
            });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {myQueries.length > 0 && (
                <div className="flex items-center justify-between bg-blue-100 p-6 rounded-xl mb-8">
                    <h2 className="text-3xl font-bold text-blue-700 mr-9">My Product Queries</h2>
                    <Link to="/add-query" className="bg-blue-600 font-bold text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                        Add Query
                    </Link>
                </div>
            )}

            {myQueries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myQueries.map(query => (
                        <div key={query._id} className="flex flex-col justify-between rounded-2xl p-5 bg-white border shadow-sm hover:shadow-lg transition duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-blue-900 mb-1">{query.queryTitle}</h3>
                                <p className="text-gray-600 mb-2 line-clamp-2">{query.reason?.slice(0, 100)}...</p>

                                <div className="flex flex-wrap gap-2 text-sm mb-4">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                        Product: {query.productName}
                                    </span>
                                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                                        Brand: {query.productBrand}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-2">
                                <Link
                                    to={`/query-details/${query._id}`}
                                    className="block text-center bg-sky-500 cursor-pointer text-white py-2 rounded-lg hover:bg-sky-600 transition">
                                    View Details
                                </Link>

                                <Link
                                    to={`/update-query/${query._id}`}
                                    className="block text-center bg-yellow-400 cursor-pointer text-white py-2 rounded-lg hover:bg-yellow-500 transition">
                                    Update
                                </Link>

                                <button
                                    onClick={() => handleDelete(query._id)}
                                    className="block w-full bg-rose-500 cursor-pointer text-white py-2 rounded-lg hover:bg-rose-600 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-500 text-lg mb-4">No queries found. Ready to add your first one?</p>
                    <Link
                        to="/add-query"
                        className="inline-block font-bold bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Add Query
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyQueries;
