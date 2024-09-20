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
        <div className="flex justify-center">
          <div className="w-fit h-fit py-8 px-4 bg-white ">
            <div>Brand</div>
            <div>Price range</div>
            <div>Availability</div>
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
