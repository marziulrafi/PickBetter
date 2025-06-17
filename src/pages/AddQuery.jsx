import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { getIdToken } from "firebase/auth";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddQuery = async e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newQuery = Object.fromEntries(formData.entries());

    newQuery.userEmail = user?.email;
    newQuery.userName = user?.displayName;
    newQuery.userImage = user?.photoURL;
    newQuery.createdAt = new Date().toISOString();
    newQuery.recommendationCount = 0;

    try {
      const idToken = await getIdToken(user);

      const res = await fetch("https://pick-better-server.vercel.app/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(newQuery),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          title: "✅ Success",
          text: "Query added successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        form.reset();
        navigate("/my-queries");
      }
    } catch (err) {
      console.error("Error submitting query:", err);
      Swal.fire("Error", "Failed to add query.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 py-6 sm:py-12 px-2 sm:px-4 md:px-6">
      <div className="w-full max-w-2xl sm:max-w-3xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-6 sm:mb-10 text-indigo-700">Submit a New Query</h2>

        <form onSubmit={handleAddQuery} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              required
              className="w-full input input-bordered px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1">Product Brand</label>
            <input
              type="text"
              name="productBrand"
              placeholder="Product Brand"
              required
              className="w-full input input-bordered px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1">Product Image</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              required
              className="w-full input input-bordered px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1">Query Title</label>
            <input
              type="text"
              name="queryTitle"
              placeholder="e.g., Is there any better alternative?"
              required
              className="w-full input input-bordered px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1">Boycotting Reason</label>
            <textarea
              name="reason"
              placeholder="The reason you don't want this product"
              required
              className="w-full textarea textarea-bordered h-24 sm:h-32 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 sm:py-3 text-sm sm:text-base rounded-lg font-bold hover:bg-indigo-700 transition-all duration-300"
          >
            Add Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuery;
