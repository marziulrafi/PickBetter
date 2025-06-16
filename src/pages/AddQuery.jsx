import { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddQuery = () => {
  const { user } = use(AuthContext);
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

      })

      .catch((err) => {
        console.error("Error submitting query:", err);
        Swal.fire("Error", "Failed to add query.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-indigo-700">Submit a New Query</h2>

        <form onSubmit={handleAddQuery} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              required
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Product Brand</label>
            <input
              type="text"
              name="productBrand"
              placeholder="Product Brand"
              required
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Product Image</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              required
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Query Title</label>
            <input
              type="text"
              name="queryTitle"
              placeholder="e.g., Is there any better alternative?"
              required
              className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Boycotting Reason</label>
            <textarea
              name="reason"
              placeholder="The reason you don't want this product"
              required
              className="w-full textarea textarea-bordered h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all duration-300"
          >
            Add Query
          </button>
        </form>


      </div>
    </div>
  );
};

export default AddQuery;
