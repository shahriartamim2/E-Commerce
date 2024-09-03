import { useGetUsersQuery } from "@/services/usersApi";

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
            <div>List of users</div>
            {data.payload.users.map((user) => (
                <div key={user._id}>
                    <div>{user.name}</div>
                    <div>{user.address}</div>
                </div>
            ))}
        </>
    );
};

export default Dashboard;
