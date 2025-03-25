import logo from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import Login from "./Login";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";

type SearchProp = {
  setSearch: (Value: string) => void;
};

const Navbar = ({ setSearch }: SearchProp) => {
  const [loginpop, setLoginPop] = useState(false);
  const { user, logout } = useAuth();
  return (
    <>
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-100 shadow-md">
   
        <img src={logo} alt="Logo" className="w-11 h-9" />

        <div className="flex items-center border-2 border-black p-2 rounded-md bg-white w-full sm:w-64">
          <img src={lens} alt="Lens" className="w-6 h-5" />
          <input
            type="text"
            placeholder="Location"
            className="ml-3 flex-grow outline-none"
          />
          <img src={arrow} alt="Arrow" className="w-6 h-6 shrink-0" />
        </div>

        <div className="flex border-2 border-black rounded-md w-full sm:w-[300px] lg:w-96 mt-2 sm:mt-0">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Find Car, Mobile, and more..."
            className="ml-3 flex-grow outline-none p-2"
          />
          <img src={search} alt="Search Icon" className="w-14 h-10 " />
        </div>

        <div className="flex items-center mt-2 sm:mt-0">
          <h1 className="font-semibold">English</h1>
          <img
            src={arrow}
            alt="Arrow"
            className="w-6 h-6 cursor-pointer ml-2"
          />
        </div>

        {user ? (
          <div className="flex items-center mt-2 sm:mt-0">
            <h1 className="font-bold text-lg">{user.email}</h1>
            <button onClick={logout} className="ml-4 text-red-500 underline">
              Logout
            </button>
          </div>
        ) : (
          <div
            onClick={() => setLoginPop(true)}
            className="flex mt-2 sm:mt-0 underline cursor-pointer hover:no-underline"
          >
            <h1 className="font-bold text-lg">Login</h1>
          </div>
        )}

        <Link to="/sell" className="w-28 flex items-center justify-center h-12 p-2 cursor-pointer rounded-full border border-yellow-500 mt-2 sm:mt-0">
          <h1 className="font-bold text-lg">+SELL</h1>
        </Link>
      </div>

      {loginpop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;
