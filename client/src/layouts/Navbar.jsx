import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authCheck, selectCurrentUserType, selectIsAuthenticated, selectStatus, selectUser } from '../features/auth/authSlice';
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectCurrentUserType);
  const user = useSelector(selectUser);



  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  return (
    <>
      <nav className=" flex justify-around bg-primaryColor  p-4  bg-opacity-50 sticky top-0 shadow-md z-50 backdrop-blur-md">
        <div>
          <Link to="/" className="text-4xl font-extrabold hover:text-slate-800">
            OKroy
          </Link>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />

          <button className="btn btn-outline">Search</button>
        </div>
        <div>
          {isAuthenticated ? (
            userType === "Admin" ? (
              <div>
                <Link to="/dashboard">
                  <button className="btn btn-active btn-accent">
                    Admin-Dashboard
                  </button>
                </Link>
                <Link to="/profile">
                  <button className="btn btn-active btn-accent">Profile</button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/profile">
                  <button className="btn btn-active btn-accent">Profile</button>
                </Link>
              </div>
            )
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="btn btn-outline">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-active btn-neutral hover:bg-white hover:text-black">Register</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
