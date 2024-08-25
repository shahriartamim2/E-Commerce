import axios from "axios";
import { logout, setUserInfo } from "@/features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserInfo, getUserInfo } from "@/services/localStorage";
import { useEffect } from "react";
import api from "@/services/axiosInterceptor";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserProfile = async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };
  
  useEffect(() => {
    const user = getUserInfo();
    const id = user._id;
    fetchUserProfile(id).then((profile) => {
      console.log('User profile:', profile);
      dispatch(setUserInfo(profile.payload.user));
    });
  }, [])
  

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
