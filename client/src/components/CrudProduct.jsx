import { useGetProductsQuery } from "@/services/productsApi";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const CrudProduct = () => {
  const [showOutlet, setShowOutlet] = useState(false);
  const handleClick = ()=>{
    setShowOutlet(true);
  }
    const { data, isLoading, error } = useGetProductsQuery();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {showOutlet ? (
        <Outlet />
      ) : (
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Index</th>
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">
                  Shipping fee
                </th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">
                  Edit Product
                </th>
              </tr>
            </thead>
            <tbody>
              {data.payload.products.map((product, index) => (
                <tr key={index} className="even:bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.shipping ? "Admin" : "Normal"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.quantity ? "Banned" : "Allowed"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Link to={`edit-product/${product._id}`} onClick={handleClick}>edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default CrudProduct
