import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { getIdToken } from 'firebase/auth';

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        const token = await getIdToken(user);

        const queriesRes = await fetch(`http://localhost:3000/queries?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const queries = await queriesRes.json();

        const queryIdMap = {};
        queries.forEach(q => {
          queryIdMap[q._id] = {
            queryTitle: q.queryTitle,
            queryProduct: q.productName
          };
        });

        const recRes = await fetch('http://localhost:3000/recommendations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allRecs = await recRes.json();

        const myRecs = allRecs
          .filter(rec => queryIdMap[rec.queryId])
          .map(rec => ({
            ...rec,
            queryTitle: queryIdMap[rec.queryId].queryTitle,
            queryProduct: queryIdMap[rec.queryId].queryProduct
          }));

        setRecommendations(myRecs);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 mb-6 sm:mb-10 text-center">Recommendations for My Queries</h2>

      {recommendations.length > 0 ? (
        <div className="overflow-x-auto bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl ring-1 ring-blue-100">
          <table className="w-full min-w-[600px] text-left text-[10px] sm:text-2xs md:text-xs text-gray-800">
            <thead className="bg-blue-200 text-blue-900 uppercase tracking-wider text-[10px] sm:text-2xs md:text-xs font-semibold">
              <tr>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-blue-300 truncate">Query Title</th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-blue-300 truncate">Query Product</th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-blue-300 truncate">Recommended Product</th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-blue-300 truncate">Recommendation Title</th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-blue-300 truncate">Recommender</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-all duration-200">
                  <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-gray-200 font-medium truncate max-w-[100px] sm:max-w-[150px]">{rec.queryTitle}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-gray-200 truncate max-w-[100px] sm:max-w-[150px]">{rec.queryProduct}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-gray-200 font-semibold truncate max-w-[100px] sm:max-w-[150px]">{rec.productName}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-gray-200 truncate max-w-[100px] sm:max-w-[150px]">{rec.title}</td>
                  <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 border-b border-gray-200 italic truncate max-w-[100px] sm:max-w-[150px]">{rec.recommenderName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8 sm:mt-16 text-sm sm:text-base md:text-lg">You haven't received any recommendations yet</p>
      )}
    </div>
  );
};

export default RecommendationsForMe;