import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/queries?email=${user.email}`)
      .then(res => res.json())
      .then(async queries => {
        const queryIdMap = {};
        queries.forEach(q => {
          queryIdMap[q._id] = {
            queryTitle: q.queryTitle,
            queryProduct: q.productName
          };
        });

        const recRes = await fetch('http://localhost:3000/recommendations');
        const allRecs = await recRes.json();

        const myRecs = allRecs
          .filter(rec => queryIdMap[rec.queryId])
          .map(rec => ({
            ...rec,
            queryTitle: queryIdMap[rec.queryId].queryTitle,
            queryProduct: queryIdMap[rec.queryId].queryProduct
          }));

        setRecommendations(myRecs);
      });
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">Recommendations for My Queries</h2>

      {recommendations.length > 0 ? (
        <div className="overflow-x-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl ring-1 ring-blue-100">
          <table className="min-w-full text-left text-sm text-gray-800">
            <thead className="bg-blue-200 text-blue-900 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 border-b border-blue-300">Query Title</th>
                <th className="px-6 py-4 border-b border-blue-300">Query Product</th>
                <th className="px-6 py-4 border-b border-blue-300">Recommended Product</th>
                <th className="px-6 py-4 border-b border-blue-300">Recommendation Title</th>
                <th className="px-6 py-4 border-b border-blue-300">Recommender</th>
              </tr>
            </thead>
            <tbody>

              {recommendations.map((rec, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-all duration-200">
                  <td className="px-6 py-4 border-b border-gray-200 font-medium">{rec.queryTitle}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{rec.queryProduct}</td>
                  <td className="px-6 py-4 border-b border-gray-200 font-semibold">{rec.productName}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{rec.title}</td>
                  <td className="px-6 py-4 border-b border-gray-200 italic">{rec.recommenderName}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      ) : (
        <p className="text-gray-500 text-center mt-16 text-lg">You haven't received any recommendations yet</p>
      )}
    </div>
  );
};

export default RecommendationsForMe;
