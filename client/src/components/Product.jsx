/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  
  return (
    <div className="w-48 bg-white shadow-2xl overflow-hidden my-2 py-4 px-4 mx-1 rounded-xl  ">
      <img
        className="w-full h-32 object-contain"
        src={product.image}
        alt={product.name}
      />
      <div className="p-2  flex flex-col justify-between">
        <div>
          <h2 className="text-gray-800 text-lg font-semibold truncate">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2 text-sm truncate">
            {product.description}
          </p>
          <p className="text-gray-900 font-bold mt-2 text-base">
            {product.price}
          </p>
        </div>
        <div className="flex flex-col">
          <button className="btn btn-active btn-neutral">Add to cart</button>
          {/* <div>
            <Link to={`/products/edit/${product._id}`} >
              <button className="btn btn-warning">Edit</button>
            </Link>
            <Link >
              <button className="btn btn-error">Delete</button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
