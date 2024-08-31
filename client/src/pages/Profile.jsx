import Logout from "@/components/Logout";
import { selectUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";


const Profile = () => {
  const user = useSelector(selectUser)

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to profile page</h1>
      <h2>Hello {user.name}</h2>

      <Logout />
    </div>
  );
};

export default Profile;
