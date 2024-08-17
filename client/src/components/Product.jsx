import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <div className="w-56 bg-white shadow-2xl rounded-lg overflow-hidden my-5 py-4 px-1 mx-1 ring-1">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4 h-40 flex flex-col justify-between">
        <div>
          <h2 className="text-gray-800 text-lg font-semibold truncate">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2 text-sm truncate">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-900 font-bold mt-2 text-base">
            {product.price}
          </p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
