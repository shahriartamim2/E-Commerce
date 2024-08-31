import PageTitle from "@/components/PageTitle";
import ProductCard from "@/components/Product";
import { useGetProductsQuery } from "@/services/productsApi";

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <PageTitle title="Home" />
      <div className="lg:mx-40">
        <div className="flex flex-col justify-center">
          <h2>List of products</h2>
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
