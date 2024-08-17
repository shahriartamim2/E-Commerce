
import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ProductCard from "../components/Product";




const Home = () => {
  const [products, setProducts] = useState([]);
  const [body, setBody] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products?limit=10", {body})
      .then((res)=> setProducts(res.data.payload.products))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <PageTitle title="Home" />
      <div className="bg-mybg">
        <h1>Choose your product </h1>
        <p>Click on the product to see more details</p>
        <div className="flex flex-col sm:mx-40">
          <div className=" "> hello i am filter</div>
          <div className=" flex flex-wrap bg-product">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home
