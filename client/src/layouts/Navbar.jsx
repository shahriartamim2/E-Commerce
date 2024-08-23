
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className=" flex justify-around bg-slate-500 p-4 lg:mx-10">
        <div>
          <Link to="/" className="text-4xl font-extrabold hover:text-slate-800">
            OKroy
          </Link>
        </div>
        <div className="flex ">
          <input
            type="text"
            className="w-full h-10 rounded-md"
            placeholder="search..."
          />

          <button>search</button>
        </div>
        <div>
            <Link to="/profile">
              <button>myprofile</button>
            </Link>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
