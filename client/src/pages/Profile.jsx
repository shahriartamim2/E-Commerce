import Logout from "@/components/Logout";
import {
  authCheck,
  selectIsAuthenticated,
  selectUser,
} from "@/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(authCheck());
  //   }
  // }, [dispatch, user]);

  // useEffect(() => {
  //   if (!isAuthenticated && !user) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, user, navigate]);


  return (
    <div key={isAuthenticated ? user.id : "default"}>
      {isAuthenticated && user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <Logout/>
          {/* Other profile related information */}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
