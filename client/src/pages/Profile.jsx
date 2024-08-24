import axios from "axios";
import { logout } from "@/features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user);
  console.log(user);

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/logout", null, { withCredentials: true });
      console.log("Logout successful:", response.data);
      logout();  // This should log the user out
      navigate("/");  // Navigate to the home page after logout
    } catch (err) {
      console.error(err);  // Log any errors
    }
  };

  return (
    <div>
      <h1>hi</h1>
      <button className="btn btn-error" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
