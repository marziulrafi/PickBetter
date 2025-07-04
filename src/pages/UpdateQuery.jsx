import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import { AuthContext } from '../provider/AuthProvider';
import { getIdToken } from 'firebase/auth';

const UpdateQuery = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [queryData, setQueryData] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchQuery = async () => {
            if (!user) return;
            const token = await getIdToken(user);

            const res = await fetch(`https://pick-better-server.vercel.app/queries/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setQueryData(data);
        };

        fetchQuery();
    }, [id, user]);

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;

        const updatedQuery = {
            queryTitle: form.queryTitle.value,
            reason: form.reason.value,
            productName: form.productName.value,
            productBrand: form.productBrand.value,
            productImage: form.productImage.value,
        };

        const token = await getIdToken(user);

        await fetch(`https://pick-better-server.vercel.app/queries/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedQuery),
        });

        Swal.fire({
            icon: 'success',
            title: 'Query Updated!',
            text: 'Your product query was updated successfully.',
            showConfirmButton: false,
            timer: 2000
        });

        navigate('/my-queries');
    };

    if (!queryData) return <Loading />;

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-white shadow-xl rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Update Your Query</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Query Title</label>
                    <input
                        type="text"
                        name="queryTitle"
                        defaultValue={queryData.queryTitle}
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Reason</label>
                    <textarea
                        name="reason"
                        defaultValue={queryData.reason}
                        required
                        rows="4"
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-blue-500"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            defaultValue={queryData.productName}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Product Brand</label>
                        <input
                            type="text"
                            name="productBrand"
                            defaultValue={queryData.productBrand}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Product Image URL</label>
                    <input
                        type="text"
                        name="productImage"
                        defaultValue={queryData.imageUrl}
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-blue-500"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition"
                    >
                        Update Query
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateQuery;
