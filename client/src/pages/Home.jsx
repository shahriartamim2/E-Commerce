import ProductCard from "@/components/Product";
import PageTitle from "../components/PageTitle";
import { useGetProductsQuery } from "@/services/productsApi";
import { useEffect } from "react";
import { logout, setUserInfo } from "@/features/auth/userSlice";
import { getUserInfo, saveUserInfo } from "@/services/localStorage";
import api from "@/services/axiosInterceptor";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const fetchUserProfile = async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    const user = getUserInfo();
    if (!user) {
      dispatch(logout());
      return
    }
    const id = user._id;
    fetchUserProfile(id).then((profile) => {
      dispatch(setUserInfo(profile.payload.user));
      saveUserInfo(profile.payload.user);
    });
  }, []);

  const res = useGetProductsQuery();
  const { isLoading, data, error } = res;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No products found</p>;
  }
  const products = data.payload.products;
  return (
    <>
      <PageTitle title="Home" />
      <div className="lg:mx-40">
        <div className="flex flex-col justify-center">
          <h2>List of products</h2>
          <div className="flex flex-wrap justify-center">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error.message}</p>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
