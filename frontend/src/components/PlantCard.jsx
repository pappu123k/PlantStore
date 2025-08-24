const PlantCard = ({ plant }) => {
  // Format price in INR
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(plant.price);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-green-800 mb-2">{plant.name}</h3>
      <p className="text-gray-700 mb-1">Price: {formattedPrice}</p>
      <p className="text-sm text-gray-600 mb-1">
        Categories: {plant.categories.join(", ")}
      </p>
      <p
        className={`font-medium ${
          plant.inStock ? "text-green-600" : "text-red-600"
        }`}
      >
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export default PlantCard;
