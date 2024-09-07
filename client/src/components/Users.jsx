import { useGetUsersQuery } from "@/services/usersApi";


const Users = () => {
  const {data, isLoading, error} = useGetUsersQuery();
  console.log(data);
  if(!data) return <div>No users found</div>
  // if(!data || !data.payload || !data.payload.user) return <div>No users found </div>
  return (
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
          </tr>
        </thead>
        <tbody>
          {data.payload.users.map((user, index) => (
            <tr key={user._id} className="even:bg-gray-100 odd:bg-white">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.address}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.isAdmin? "Admin" : "Normal"}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.isBanned? "Banned" : "Allowed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
