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
      <nav className=" flex justify-around bg-slate-500 p-4">
        <div>
          <Link to="/" className="text-4xl font-extrabold hover:text-slate-800">
            OKroy
          </Link>
        </div>
        <div className="flex ">
          <input
            type="text"
            className="input input-bordered input-error w-full max-w-xs"
            placeholder="search..."
          />

          <button className="btn btn-outline btn-accent">Search</button>
        </div>
        <div>
          {isAuthenticated ? (
            userType === "Admin" ? (
              <div>
                <Link to="/dashboard">
                  <button className="btn btn-active btn-accent">Admin-Dashboard</button>
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
            <div>
              <Link to="/login">
                <button className="btn btn-active btn-accent">Login</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
