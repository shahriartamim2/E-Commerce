import {
  selectCurrentUserType,
  selectIsAuthenticated,
  selectStatus,
  selectUser,
  setUser,
} from "@/features/auth/authSlice";
import { useLoginMutation } from "@/services/authApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isError, isLoading, isSuccess }] = useLoginMutation();
  const currentUserType = useSelector(selectCurrentUserType);
  const status = useSelector(selectStatus);
  const LoadingElement = () => <div>Loading...</div>;
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(credentials).unwrap();
      if (res.payload && res.payload.user) {
        dispatch(setUser(res.payload.user));
        navigate("/profile");
      }
    } catch (error) {
      console.log("Failed to login", error);
    }
  };


  return (
    <div className="flex flex-col justify-center gap-6">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-active btn-accent">Submit</button>
      </form>
    </div>
  );
};

export default Login;
