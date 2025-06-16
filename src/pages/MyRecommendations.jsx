import React, { useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const MyRecommendations = () => {
    const { user } = React.useContext(AuthContext);
    const [myRecs, setMyRecs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/recommendations?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyRecs(data));
    }, [user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the recommendation permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/recommendations/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire('Deleted!', 'Your recommendation has been removed.', 'success');
                        setMyRecs(prev => prev.filter(rec => rec._id !== id));
                    });
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">My Recommendations</h2>

            {myRecs.length === 0 ? (
                <p className="text-center font-semibold text-gray-500">You haven't made any recommendations yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-100 text-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-bold">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-bold">Recommended Product</th>
                                <th className="px-6 py-3 text-left text-sm font-bold">Query</th>
                                <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {myRecs.map(rec => (
                                <tr key={rec._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{rec.title}</td>

                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img
                                            src={rec.productImage}
                                            alt=""
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <span className="text-sm text-gray-800">{rec.productName}</span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-700">{rec.queryTitle}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(rec.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(rec._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-semibold text-sm px-4 py-1 rounded transition cursor-pointer">Delete</button>
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