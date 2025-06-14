import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';

const QueryDetails = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const [query, setQuery] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        productName: '',
        productImage: '',
        reason: ''
    });

    useEffect(() => {
        fetch(`http://localhost:3000/queries/${id}`)
            .then(res => res.json())
            .then(data => setQuery(data));

        fetch(`http://localhost:3000/recommendations?queryId=${id}`)
            .then(res => res.json())
            .then(data => setRecommendations(data));
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const recommendation = {
            ...formData,
            queryId: query._id,
            queryTitle: query.queryTitle,
            productName: query.productName,
            userEmail: query.userEmail,
            userName: query.userName,
            recommenderEmail: user.email,
            recommenderName: user.displayName,
            createdAt: new Date().toISOString()
        };

        await fetch('http://localhost:3000/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendation)
        });


        setFormData({ title: '', productName: '', productImage: '', reason: '' });
        const res = await fetch(`http://localhost:3000/recommendations?queryId=${id}`);
        const updated = await res.json();
        setRecommendations(updated);
    };

    if (!query) return <Loading />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
            <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-2">{query.queryTitle}</h1>

                {query.imageUrl && (
                    <img
                        src={query.imageUrl}
                        alt=""
                        className=" max-w-sm mx-auto my-4 rounded-lg shadow-md object-cover"
                    />
                )}

                <p><strong>Reason:</strong> {query.reason}</p>
                <p className="mt-4 text-sm text-gray-600">Product: {query.productName} | Brand: {query.productBrand}</p>
                <p className="text-sm text-gray-600">Asked by: {query.userName} ({query.userEmail})</p>
            </div>


            <form onSubmit={handleSubmit} className="bg-blue-50 p-6 rounded-xl shadow space-y-4">
                <h2 className="text-xl font-bold">Add a Recommendation</h2>

                <input name="title" onChange={handleChange} value={formData.title} placeholder="Recommendation Title" required className="w-full px-4 py-2 rounded border" />

                <input name="productName" onChange={handleChange} value={formData.productName} placeholder="Recommended Product Name" required className="w-full px-4 py-2 rounded border" />

                <input name="productImage" onChange={handleChange} value={formData.productImage} placeholder="Recommended Product Image URL" required className="w-full px-4 py-2 rounded border" />

                <textarea name="reason" onChange={handleChange} value={formData.reason} placeholder="Recommendation Reason" required className="w-full px-4 py-2 rounded border" />

                <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Add Recommendation</button>
                
            </form>

            <div className="space-y-4">
                <h3 className="text-xl font-bold">All Recommendations</h3>
                {recommendations.map(rec => (
                    <div key={rec._id} className="p-4 bg-white rounded-xl border">
                        <h4 className="text-lg font-bold">{rec.title}</h4>
                        <img src={rec.productImage} alt={rec.productName} className="w-40 h-40 object-cover rounded mt-2" />
                        <p className="mt-2"><strong>Product:</strong> {rec.productName}</p>
                        <p className="text-sm text-gray-600">{rec.reason}</p>
                        <p className="text-xs text-gray-500 mt-2">Recommended by {rec.recommenderName} ({rec.recommenderEmail}) on {new Date(rec.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QueryDetails;