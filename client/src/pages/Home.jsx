import PageTitle from "@/components/PageTitle";
import ProductCard from "@/components/Product";
import { useGetProductsQuery } from "@/services/productsApi";
import { useState } from "react";

const Home = () => {
  
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <PageTitle title="Home" />
      <div className="lg:mx-40">
        <div className="flex justify-center">
          <div className="w-fit h-fit py-8 px-4 bg-white my-2 rounded-lg ">
            <label>Category:</label>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Click^
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a >Apple</a>
                </li>
                <li>
                  <a >Samsung</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap">
              <label>Min Price:</label>
              <input type="text" />
              <input
                type="number"
                value={minPrice}
                placeholder="Min Price"
                onChange={handleMinPriceChange}
                className="input input-bordered w-full "
              />
              <label>Max Price:</label>
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {data.payload.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
