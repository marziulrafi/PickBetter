import React, { use, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';
import { getIdToken } from 'firebase/auth';
import { toast } from 'react-toastify';

const QueryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = use(AuthContext);
    const [query, setQuery] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        productName: '',
        productImage: '',
        reason: ''
    });

    useEffect(() => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'Please log in to view query details.',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/join');
            return;
        }

        const fetchData = async () => {
            try {
                const idToken = await getIdToken(user);
                // console.log("User email:", user.email, "ID Token:", idToken);

                const queryRes = await fetch(`https://pick-better-server.vercel.app/queries/${id}`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });

                if (queryRes.status === 403) {
                    const errorData = await queryRes.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Access Denied',
                        text: errorData.message || 'You cannot view this query. If you are the owner, check your login email.',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    navigate('/my-queries');
                    return;
                }

                if (!queryRes.ok) {
                    const errorData = await queryRes.json();
                    throw new Error(`Query fetch failed: ${queryRes.statusText} - ${errorData.message || ''}`);
                }

                const queryData = await queryRes.json();
                console.log("Query data:", queryData);
                setQuery(queryData);


                const recRes = await fetch(`https://pick-better-server.vercel.app/recommendations?queryId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });

                if (!recRes.ok) {
                    const errorData = await recRes.json();
                    throw new Error(`Recommendations fetch failed: ${recRes.statusText} - ${errorData.message || ''}`);
                }

                const recData = await recRes.json();
                // console.log("Recommendations data:", recData); 
                if (Array.isArray(recData)) {
                    setRecommendations(recData);
                } else {
                    console.error("Expected an array, got:", recData);
                    setRecommendations([]);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setQuery(null);
                setRecommendations([]);
            }
        };

        fetchData();
    }, [id, user, navigate]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (submitting || !query) return;
        setSubmitting(true);

        try {
            const idToken = await getIdToken(user);

            const recommendation = {
                ...formData,
                queryId: query._id,
                queryTitle: query.queryTitle,
                productName: formData.productName,
                productImage: formData.productImage,
                reason: formData.reason,
                queryProductName: query.productName,
                queryProductBrand: query.productBrand,
                userEmail: query.userEmail,
                userName: query.userName,
                recommenderEmail: user.email,
                recommenderName: user.displayName,
                createdAt: new Date().toISOString(),
            };

            const recRes = await fetch("https://pick-better-server.vercel.app/recommendations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify(recommendation),
            });

            if (!recRes.ok) {
                const errorData = await recRes.json();
                throw new Error(`Recommendation submission failed: ${recRes.statusText} - ${errorData.message || ''}`);
            }

            const patchRes = await fetch(`https://pick-better-server.vercel.app/increase-recommendation/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (!patchRes.ok) {
                const errorData = await patchRes.json();
                throw new Error(`Recommendation count update failed: ${patchRes.statusText} - ${errorData.message || ''}`);
            }

            setFormData({ title: "", productName: "", productImage: "", reason: "" });

            const res = await fetch(`https://pick-better-server.vercel.app/recommendations?queryId=${id}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`Recommendations fetch failed: ${res.statusText} - ${errorData.message || ''}`);
            }

            const updated = await res.json();
            setRecommendations(Array.isArray(updated) ? updated : []);
            Swal.fire({
                icon: 'success',
                title: 'Recommendation Added!',
                text: 'Your recommendation has been submitted.',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error("Error submitting recommendation:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to submit recommendation.',
                timer: 2000,
                showConfirmButton: false,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const copyQueryLink = async () => {
        const queryUrl = window.location.href;
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

    if (!query) return <Loading />;

    return (
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow transition-colors duration-300">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white">{query.queryTitle || 'N/A'}</h1>
                    
                </div>

                {query.imageUrl && (
                    <img
                        src={query.imageUrl}
                        alt=""
                        className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-sm mx-auto my-2 sm:my-4 rounded-lg shadow-md object-cover"
                    />
                )}

                <p className="text-sm sm:text-base dark:text-gray-300"><strong>Reason:</strong> {query.reason || 'N/A'}</p>
                <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">Product: {query.productName || 'N/A'} | Brand: {query.productBrand || 'N/A'}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Asked by: {query.userName || 'N/A'} ({query.userEmail || 'N/A'})</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg md:text-xl font-bold">Add a Recommendation</h2>

                <input
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    placeholder="Recommendation Title"
                    required
                    className="w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded border"
                />

                <input
                    name="productName"
                    onChange={handleChange}
                    value={formData.productName}
                    placeholder="Recommended Product Name"
                    required
                    className="w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded border"
                />

                <input
                    name="productImage"
                    onChange={handleChange}
                    value={formData.productImage}
                    placeholder="Recommended Product Image URL"
                    required
                    className="w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded border"
                />

                <textarea
                    name="reason"
                    onChange={handleChange}
                    value={formData.reason}
                    placeholder="Recommendation Reason"
                    required
                    className="w-full px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded border"
                />

                <button
                    className="bg-blue-600 text-white cursor-pointer px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded hover:bg-blue-700"
                    type="submit"
                    disabled={submitting || !query}
                >
                    {submitting ? "Submitting..." : "Add Recommendation"}
                </button>
            </form>

            <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold">All Recommendations</h3>
                {recommendations.map(rec => (
                    <div key={rec._id} className="p-3 sm:p-4 bg-white rounded-xl border">
                        <h4 className="text-sm sm:text-base md:text-lg font-bold">{rec.title}</h4>
                        <img
                            src={rec.productImage}
                            alt={rec.productName}
                            className="w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 object-cover rounded mt-1 sm:mt-2"
                        />
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm"><strong>Product:</strong> {rec.productName}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{rec.reason}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Recommended by {rec.recommenderName} ({rec.recommenderEmail}) on {new Date(rec.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueryDetails;