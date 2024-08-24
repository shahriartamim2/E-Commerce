import axios from "axios";
import { logout } from "@/features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/services/localStorage";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/logout", null, { withCredentials: true });
      console.log("Logout successful:", response.data);
      dispatch(logout());  
      clearUserInfo();
      navigate("/"); 
    } catch (err) {
      console.error(err);  
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
