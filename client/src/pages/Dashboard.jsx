import { useGetUsersQuery } from "@/services/usersApi";

const Dashboard = () => {
    const { data, isLoading } = useGetUsersQuery();
    console.log(data);
    if (isLoading) {
        return <div>Loading</div>;
    }
    if (!data) {
        return <div>Not Found</div>;
    }
    return (
        <>
            <div>List uf users</div>
            {data.payload.users.map((user) => (<div key={user._id}>
                    <div>user.name</div>
                    <div>user.address</div>
                </div>))}
        </>
    );
};

export default Dashboard;
