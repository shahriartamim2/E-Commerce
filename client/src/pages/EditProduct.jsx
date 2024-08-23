import { useGetProductByIdQuery } from "@/services/productsApi";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const res = useGetProductByIdQuery(id);
    console.log(res);
    const { isLoading, data, error } = res;
    if (data) {
        const product = data.payload.product;
        return (
            <>
                {isLoading ? (<p>Loading...</p>) : error ? (<p>{error.message}</p>) : (<div>
                    <h1>Edit Product</h1>
                    <form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={product.name} />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" id="description" value={product.description} />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="text" id="price" value={product.price} />
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input type="text" id="image" value={product.image} />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>)}
            </>
        );
    }


};



export default EditProduct;
