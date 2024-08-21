
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <>
      <nav className=" flex justify-around bg-slate-500 p-4 lg:mx-10">
        <div>
          <a href="/" className="text-4xl font-extrabold hover:text-slate-800">
            OKroy
          </a>
        </div>
        <div className="flex ">
          <input
            type="text"
            className="w-full h-10 rounded-md"
            placeholder="search..."
          />
          <button>
            <Button className="bg-orange-500">Search</Button>
          </button>
        </div>
        <div>
          <a href="/login">
            <Button className="bg-lime-500">signin</Button>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
