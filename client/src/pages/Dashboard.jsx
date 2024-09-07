import { useGetUsersQuery } from "@/services/usersApi";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    const { data, isLoading, error } = useGetUsersQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users</div>;
    }

    if (
        !data ||
        !data.payload ||
        !data.payload.users ||
        data.payload.users.length === 0
    ) {
        return <div>No users found</div>;
    }

    return (
      <>
        <div className="grid grid-cols-6">
          <div className="col-span-1  flex flex-col justify-center items-center p-4 m-4 bg-cardColor rounded-lg shadow-xl">
            <div className="flex flex-col w-full gap-4">
              <Link
                to="crud-users"
                className="shadow-md  w-full item text-center py-3 rounded-md bg-white"
              >
                Users
              </Link>
              <Link
                to="crud-category"
                className="shadow-md  w-full item text-center py-3 rounded-md bg-white"
              >
                Categories
              </Link>
              <Link
                to="crud-product"
                className="shadow-md  w-full item text-center py-3 rounded-md bg-white"
              >
                Products
              </Link>
            </div>
          </div>
          <div className="col-span-5">
            <Outlet />
          </div>
        </div>
      </>
    );
};

export default Dashboard;
