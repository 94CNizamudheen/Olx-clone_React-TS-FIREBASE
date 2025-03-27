import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const product = location?.state?.data;

  // Fallback for missing data
  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        <h1 className="text-xl font-semibold">Product details not found.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title || "Product"}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400")} // Fallback image
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-bold text-2xl md:text-3xl text-gray-800">
            ₹ {product.price.toLocaleString("en-IN")}
          </h1>
          <h2 className="mt-2 text-lg md:text-xl text-gray-700">{product.title}</h2>
          <div className="mt-4">
            <span className="font-semibold text-gray-600">Category:</span>{" "}
            <span className="text-gray-800">{product.category}</span>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-gray-600">Description:</span>{" "}
            <p className="text-gray-700 mt-1">{product.description || "No description available."}</p>
          </div>

          {/* Optional Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Contact Seller
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;