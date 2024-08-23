
import ProductCard from '@/components/Product';
import PageTitle from '../components/PageTitle';
import { useGetProductsQuery } from '@/services/productsApi';

const Home = () => {
  const res = useGetProductsQuery();
  const {isLoading, data, error} = res;
  if(data){
    const products = data.payload.products;
  return (
    <>
      <PageTitle title="Home" />
      <div className="lg:mx-40">
        <div className="flex flex-col justify-center">
          <h2>List of products</h2>
          <div className="flex flex-wrap justify-center">
      {
        isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )
      }
          </div>
        </div>
      </div>
    </>
  );
}
}

export default Home
