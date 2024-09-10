import { useGetUsersQuery } from "@/services/usersApi";
import { Link, Outlet } from "react-router-dom";


const Users = () => {
  const {data, isLoading, error} = useGetUsersQuery();
  if(isLoading) return <div>Loading</div>
  if(!data || !data.payload || !data.payload.users) return <div>No users found </div>
  return (
    <>
      <div className="bg-cardColor m-4 p-4 shadow-xl rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Index</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">User-Type</th>
              <th className="border border-gray-300 px-4 py-2">Access</th>
              <th className="border border-gray-300 px-4 py-2">Edit-Access</th>
            </tr>
          </thead>
          <tbody>
            {data.payload.users.map((user, index) => (
              <tr key={user._id} className="even:bg-gray-100 odd:bg-white">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.address}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.isAdmin ? "Admin" : "Normal"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.isBanned ? "Banned" : "Allowed"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link to={`edit-access/${user._id}`}>edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-cardColor m-4 p-4 shadow-xl rounded-lg">
        <Outlet/>
      </div>
    </>
  );
}

export default Users;
