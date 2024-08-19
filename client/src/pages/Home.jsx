
import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import ProductCard from "../components/Product";
import Category from '../components/Category';




const Home = () => {
  const [products, setProducts] = useState([]);
  const [body, setBody] = useState({
    page: 1,
    limit: 10,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products?limit=10",)
      .then((res)=> setProducts(res.data.payload.products))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <PageTitle title="Home" />
      <div className="lg:mx-40">
    <Category/>
        <div className="flex flex-col ">
          <div className=" "> hello i am filter</div>
          <div className=" flex flex-wrap bg-product justify-center">
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
