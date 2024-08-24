import { useGetProductByIdQuery } from "@/services/productsApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const EditProduct = () => {
    const { id } = useParams();
    const res = useGetProductByIdQuery();
    const { isLoading, data, error } = res;

    const [updatedProduct, setUpdatedProduct] = useState({
        name: "",
        description: "",
        price: "",
        image: null,
        quantity: "",
        shipping: "",
    });

    useEffect(() => {
        if (data) {
            setUpdatedProduct({
                name: data.payload.product.name,
                description: data.payload.product.description,
                price: data.payload.product.price,
                image: data.payload.product.image,
                quantity: data.payload.product.quantity,
                shipping: data.payload.product.shipping,
            })
        }
    }, [data])

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files) {
            setUpdatedProduct({ ...updatedProduct, image: files[0] });
        } else {
            setUpdatedProduct({ ...updatedProduct, [name]: value });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedProduct);
    }

    return (
        <>
            {isLoading ? (<p>Loading...</p>)
                :
                error ? (<p>{error.message}</p>)
                    :
                    (<div>
                        <h1>Edit Product</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p htmlFor="name">Name</p>
                                <input type="text" id="name" name="name" value={updatedProduct.name} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <p htmlFor="description">Description</p>
                                <input type="text" id="description" name="description" value={updatedProduct.description} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <p htmlFor="price">Price</p>
                                <input type="number" id="price" name="price" value={updatedProduct.price} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <p htmlFor="quantity">Quantity</p>
                                <input type="number" id="price" name="quantity" value={updatedProduct.quantity} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <p htmlFor="shipping">Shipping</p>
                                <input type="number" id="price" name="shipping" value={updatedProduct.shipping} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                            </div>
                            <div>
                                <p htmlFor="file">Image</p>

                                <input type="file" name="image" id="image" onChange={handleChange} className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                            </div>
                            <button formAction="submit" className="btn btn-outline btn-accent">Submit</button>
                        </form>
                    </div>)}
        </>
    );
};

export default EditProduct;
