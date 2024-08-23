
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <div className="w-40  bg-white shadow-2xl rounded-sm overflow-hidden my-2 py-4 px-1 mx-1 ">
      <img
        className="w-full h-40 object-contain"
        src={product.image}
        alt={product.name}
      />
      <div className="p-2 h-36 flex flex-col justify-between">
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


export default ProductCard;
