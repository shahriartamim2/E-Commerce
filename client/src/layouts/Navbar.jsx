
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/login">
            <button className="btn btn-active btn-accent">Login</button>
            </Link>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
