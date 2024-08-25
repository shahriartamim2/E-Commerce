

const EditProduct = () => {

    return ((<div>
        <h1>Edit Product</h1>
        <form >
            <div>
                <p htmlFor="name">Name</p>
                <input type="text" id="name" name="name"  className="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <p htmlFor="description">Description</p>
                <input type="text" id="description" name="description" className="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <p htmlFor="price">Price</p>
                <input type="number" id="price" name="price"  className="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <p htmlFor="quantity">Quantity</p>
                <input type="number" id="price" name="quantity"  className="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <p htmlFor="shipping">Shipping</p>
                <input type="number" id="price" name="shipping" className="input input-bordered w-full max-w-xs" />
            </div>
            <div>
                <p htmlFor="file">Image</p>

                <input type="file" name="image" id="image"  className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
            </div>
            <button formAction="submit" className="btn btn-outline btn-accent">Submit</button>
        </form>
    </div>));
};

export default EditProduct;