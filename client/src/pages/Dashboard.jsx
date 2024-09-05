import { useGetUsersQuery } from "@/services/usersApi";
import { Link } from "react-router-dom";

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
          <div className="col-span-1 bg-blue-500">
            <div>
              <h1>Links</h1>
            </div>
            <div className="flex flex-col">
              <Link>Users</Link>
              <Link>Categories</Link>
              <Link>Products</Link>
            </div>
          </div>
          <div className="col-span-3 bg-orange-700"></div>
        </div>
      </>
    );
};

export default Dashboard;
