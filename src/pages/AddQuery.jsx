import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddQuery = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newQuery = Object.fromEntries(formData.entries());

    newQuery.userEmail = user?.email;
    newQuery.userName = user?.displayName;
    newQuery.userImage = user?.photoURL;
    newQuery.createdAt = new Date().toISOString();
    newQuery.recommendationCount = 0;

    fetch("http://localhost:3000/queries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.acknowledged) {
          Swal.fire("✅ Success", "Query added successfully!", "success");
          form.reset();
          navigate("/my-queries");
        }
      })
      .catch((err) => {
        console.error("Error submitting query:", err);
        Swal.fire("❌ Error", "Failed to add query.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-8">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">📤 Submit a New Query</h2>

        <form onSubmit={handleAddQuery} className="space-y-6">
          <input
            type="text"
            name="productName"
            placeholder="⚙️ Product Name"
            required
            className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="productBrand"
            placeholder="🏷️ Product Brand"
            required
            className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="url"
            name="imageUrl"
            placeholder="🖼️ Image URL"
            required
            className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="queryTitle"
            placeholder="❓ Query Title (e.g., Better alternatives?)"
            required
            className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            name="reason"
            placeholder="📄 Reason for the query (Explain clearly)"
            required
            className="w-full textarea textarea-bordered h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ></textarea>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            ➕ Add Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuery;
