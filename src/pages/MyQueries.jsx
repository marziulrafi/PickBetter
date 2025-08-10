import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { getAuth } from 'firebase/auth';
import app from '../firebase.config';


const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const [myQueries, setMyQueries] = useState([]);
    const auth = getAuth(app);

    const fetchQueries = async () => {
        try {

            if (!user || !user.email) {
                console.warn("User or user email not available. Cannot fetch queries.");
                setMyQueries([]);
                return;
            }

            const token = await auth.currentUser.getIdToken();
            const res = await fetch(`https://pick-better-server.vercel.app/queries?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {

                const errorData = await res.json();
                throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setMyQueries(data);
        } catch (error) {
            console.error('Error fetching queries:', error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Failed to load your queries: ${error.message || 'Please try again.'}`,
                width: '300px',
                customClass: {
                    popup: 'p-4',
                    title: 'text-base font-bold',
                    content: 'text-sm',
                }
            });
        }
    };

    useEffect(() => {

        if (user?.email) {
            fetchQueries();
        } else {

            setMyQueries([]);
        }
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete your query.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            width: '300px',
            customClass: {
                popup: 'p-4',
                title: 'text-base font-bold',
                content: 'text-sm',
                confirmButton: 'px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700',
                cancelButton: 'px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600'
            }
        });

        if (result.isConfirmed) {
            try {
                const token = await auth.currentUser.getIdToken();
                const res = await fetch(`https://pick-better-server.vercel.app/queries/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                if (data?.deletedCount > 0 || data?.acknowledged) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your query has been removed.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        width: '300px',
                        customClass: {
                            popup: 'p-4',
                            title: 'text-base font-bold',
                            content: 'text-sm',
                        }
                    });
                    setMyQueries(prev => prev.filter(q => q._id !== id));
                } else {
                    Swal.fire({
                        title: 'Failed!',
                        text: 'Could not delete the query.',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000,
                        width: '300px',
                        customClass: {
                            popup: 'p-4',
                            title: 'text-base font-bold',
                            content: 'text-sm',
                        }
                    });
                }
            } catch (error) {
                console.error('Error deleting query:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Failed to delete query: ${error.message || 'Please try again.'}`,
                    width: '300px',
                    customClass: {
                        popup: 'p-4',
                        title: 'text-base font-bold',
                        content: 'text-sm',
                    }
                });
            }
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-10">
            {myQueries.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-100 p-4 sm:p-6 rounded-xl mb-4 sm:mb-8">
                    <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 mb-4 sm:mb-0 sm:mr-4">My Product Queries</h2>
                    <Link to="/add-query" className="bg-blue-600 font-bold text-white px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-blue-700 transition">
                        Add Query
                    </Link>
                </div>
            )}

            {myQueries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {myQueries.map(query => (
                        <div key={query._id} className="flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white border shadow-sm hover:shadow-lg transition duration-300">
                            <div>
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-900 mb-1">{query.queryTitle}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{query.reason?.slice(0, 100)}...</p>

                                <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm mb-2 sm:mb-4">
                                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                        Product: {query.productName}
                                    </span>
                                    <span className="bg-indigo-100 text-indigo-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                        Brand: {query.productBrand}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-1 sm:space-y-2">
                                <Link
                                    to={`/query-details/${query._id}`}
                                    className="block text-center bg-sky-500 cursor-pointer text-white py-1 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-sky-600 transition">
                                    View Details
                                </Link>

                                <Link
                                    to={`/update-query/${query._id}`}
                                    className="block text-center bg-yellow-400 cursor-pointer text-white py-1 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-yellow-500 transition">
                                    Update
                                </Link>

                                <button
                                    onClick={() => handleDelete(query._id)}
                                    className="block w-full bg-rose-500 cursor-pointer text-white py-1 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-rose-600 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10 sm:mt-20 animate-fadeIn">
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-3 sm:mb-5">
                        🚀 No queries found. Ready to start your first one?
                    </p>
                    <Link
                        to="/add-query"
                        className="inline-block font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                        ➕ Add Query
                    </Link>
                </div>

            )}
        </div>
    );
};

export default MyQueries;