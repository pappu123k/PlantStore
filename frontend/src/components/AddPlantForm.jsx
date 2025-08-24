import { useState } from "react";

const AddPlantForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [inStock, setInStock] = useState(true);
  const [error, setError] = useState("");

  const inr = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(n);

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const numPrice = Number(price);
    const categoryArray = categories
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    if (!trimmedName || !price || Number.isNaN(numPrice) || numPrice <= 0) {
      setError("Please enter a valid name and a price greater than 0.");
      return;
    }
    if (!categoryArray.length) {
      setError("Enter at least one category.");
      return;
    }

    onAdd({
      name: trimmedName,
      price: numPrice,
      categories: categoryArray,
      inStock,
    });
    setName("");
    setPrice("");
    setCategories("");
    setInStock(true);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-5 border border-green-100"
    >
      <h2 className="text-2xl font-bold text-green-900 text-center">
        🌿 Add a New Plant
      </h2>

      {error && (
        <p className="text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-sm">
          {error}
        </p>
      )}

      {/* Plant Name */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Plant Name
        </label>
        <input
          type="text"
          placeholder="Enter plant name (e.g., Aloe Vera)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Price (INR)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter price in INR"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
          required
        />
        {price && (
          <p className="text-xs text-gray-500 mt-1">
            Preview: {inr(Number(price))}
          </p>
        )}
      </div>

      {/* Categories (your input version) */}
      <div>
        <label className="block text-sm font-medium text-green-800 mb-1">
          Categories
        </label>
        <input
          type="text"
          placeholder="Enter categories (e.g., Outdoor, Indoor)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="w-full mb-1 px-4 py-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
          required
        />
        <p className="text-xs text-gray-500">
          Separate multiple categories with commas
        </p>
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-medium">In Stock</span>
        <button
          type="button"
          role="switch"
          aria-checked={inStock}
          onClick={() => setInStock(!inStock)}
          className={`w-12 h-6 flex items-center rounded-full transition ${
            inStock ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`h-5 w-5 bg-white rounded-full shadow transform transition ${
              inStock ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md transition"
        >
          Add Plant
        </button>
        <button
          type="button"
          onClick={() => {
            setName("");
            setPrice("");
            setCategories("");
            setInStock(true);
            setError("");
          }}
          className="flex-1 py-3 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 border"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default AddPlantForm;
