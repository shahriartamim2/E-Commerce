
import { useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import ProductCard from "../components/Product";
import Category from '../components/Category';
import { fetchProducts } from '../features/products/productsSlice';
import {useDispatch, useSelector} from 'react-redux';


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  

  return (
    <>
      <PageTitle title="Home" />
      <div className="lg:mx-40">
        <Category />
        <div className="flex flex-col ">
          <div className=" "> hello i am filter</div>
          <div className=" flex flex-wrap bg-product justify-center">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            )) || <p>No products available</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home
