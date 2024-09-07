import {
  useFindSingleProductQuery,
  useUpdateProductMutation,
} from "@/services/productsApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFindSingleProductQuery(id);
  const [updateProduct, { isLoading: updateLoading, error: updateError }] =
    useUpdateProductMutation();
  const [editProduct, seteditProduct] = useState(null);

  useEffect(() => {
    if (data && data.payload && data.payload.product) {
      seteditProduct(data.payload.product);
    }
  }, [data]);

  const handleChange = (e) => {
    seteditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editProduct);
    try {
      await updateProduct({ id, ...editProduct});
    } catch (error) {
      console.log("Failed to update product", error);
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Product fetching error : {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center px-4 py-6">
      <h1>Edit Product</h1>
      {editProduct ? (
        <form onSubmit={handleSubmit}>
          <div>
            <p htmlFor="name">Name</p>
            <input
              type="text"
              id="name"
              name="name"
              value={editProduct.name}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <p htmlFor="description">Description</p>
            <input
              type="text"
              id="description"
              name="description"
              value={editProduct.description}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <p htmlFor="price">Price</p>
            <input
              type="number"
              id="price"
              name="price"
              value={editProduct.price}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <p htmlFor="quantity">Quantity</p>
            <input
              type="number"
              id="price"
              name="quantity"
              value={editProduct.quantity}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <p htmlFor="shipping">Shipping</p>
            <input
              type="number"
              id="price"
              name="shipping"
              value={editProduct.shipping}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* <div>
          <p htmlFor="file">Image</p>
          <input
            type="file"
            name="image"
            id="image"
            value={editProduct.image}
            onChange={handleChange}
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
          />
        </div> */}
          <button
            formAction="submit"
            className="btn btn-outline btn-accent my-4"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default EditProduct;
