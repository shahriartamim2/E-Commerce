import Logout from "@/components/Logout";
import { selectStatus } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

const Profile = () => {
  const status = useSelector(selectStatus);

  if (status === "loading") {
    return <div>Loading...</div>; // You can replace this with a loading spinner or similar
  }
  return (
    <div>
      <h1>Welcome to profile page</h1>
      <Logout/>
    </div>
  );
};

export default Profile;
