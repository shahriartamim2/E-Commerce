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
        <div className="grid grid-cols-4">
          <div className="col-span-1  flex flex-col justify-center items-center">
            <div className="flex flex-col p-4 bg-white">
              <h3>Links</h3>
              <Link to="crud-users">Users</Link>
              <Link to="crud-product">Categories</Link>
              <Link to="crud-category">Products</Link>
            </div>
          </div>
          <div className="col-span-3  bg-white">
            <Outlet />
          </div>
        </div>
      </>
    );
};

export default Dashboard;
