import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
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

          <Button className="bg-orange-500">
            Search
          </Button>
        </div>
        <div>
          {isLoggedin ? (
            <Link to="/profile">
              <Button className="bg-lime-500">My Profile</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="bg-lime-500">signin</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
