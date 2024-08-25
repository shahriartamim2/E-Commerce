import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authCheck } from '../features/auth/authSlice';
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
            <div>
              <Link to="/profile">
                <button className="btn btn-active btn-accent">{user.name}</button>
              </Link>
              <Link to="/dashboard">
                <button className="btn btn-active btn-accent">Dashboard</button>
              </Link>
            </div>
          ) : (
              <Link to="/login">
                <button className="btn btn-active btn-accent">Login</button>
              </Link>
          )}
          
        </div>
      </nav>
    </>
  );
};
export default Navbar;
