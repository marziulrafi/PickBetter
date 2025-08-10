import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import { getIdToken } from 'firebase/auth';

const MyRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [myRecs, setMyRecs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;

            try {
                const token = await getIdToken(user);

                const res = await fetch(`https://pick-better-server.vercel.app/recommendations?email=${user.email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setMyRecs(data);
            } catch (err) {
                console.error('Failed to fetch recommendations:', err);
            }
        };

        fetchData();
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the recommendation permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const token = await getIdToken(user);

                await fetch(`https://pick-better-server.vercel.app/recommendations/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                Swal.fire('Deleted!', 'Your recommendation has been removed.', 'success');
                setMyRecs(prev => prev.filter(rec => rec._id !== id));
            } catch (err) {
                console.error('Error deleting recommendation:', err);
                Swal.fire('Error', 'Failed to delete recommendation.', 'error');
            }
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center text-blue-700">My Recommendations</h2>

            {myRecs.length === 0 ? (
                <p className="text-center font-semibold text-gray-500 text-sm sm:text-base animate-fadeIn">
                    <span className="inline-block px-4 py-2 bg-gray-100 rounded-full shadow-sm">
                        ✨ You haven’t made any recommendations yet.
                    </span>
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-100 text-gray-700">
                            <tr>
                                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold">Title</th>
                                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold">Recommended Product</th>
                                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold">Query</th>
                                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold">Date</th>
                                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {myRecs.map(rec => (
                                <tr key={rec._id} className="hover:bg-gray-50 transition">
                                    <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px]">
                                        {rec.title}
                                    </td>
                                    <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                                        <img
                                            src={rec.productImage}
                                            alt=""
                                            className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 object-cover rounded"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-800 truncate max-w-[120px] sm:max-w-[150px]">
                                            {rec.productName}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 truncate max-w-[120px] sm:max-w-[150px]">
                                        {rec.queryTitle}
                                    </td>
                                    <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                        {new Date(rec.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-2 sm:px-4 md:px-6 py-3 sm:py-4">
                                        <button
                                            onClick={() => handleDelete(rec._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-2 sm:px-4 py-1 rounded transition cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRecommendations;
