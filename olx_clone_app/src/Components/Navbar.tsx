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
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-100 shadow-md gap-4 md:gap-6">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-10 h-8 md:w-11 md:h-9" />

        {/* Location Input */}
        <div className="flex items-center border-2 border-black p-2 rounded-md bg-white w-full max-w-xs md:w-64">
          <img src={lens} alt="Lens" className="w-5 h-4 md:w-6 md:h-5" />
          <input
            type="text"
            placeholder="Location"
            className="ml-2 flex-grow outline-none text-sm md:text-base"
          />
          <img src={arrow} alt="Arrow" className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
        </div>

        {/* Search Input */}
        <div className="flex border-2 border-black rounded-md w-full max-w-md md:w-80 lg:w-96">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Find Car, Mobile, and more..."
            className="ml-2 flex-grow outline-none p-2 text-sm md:text-base"
          />
          <img src={search} alt="Search Icon" className="w-10 h-10 md:w-12 md:h-10" />
        </div>

        {/* Language Selector */}
        <div className="flex items-center">
          <h1 className="font-semibold text-sm md:text-base">English</h1>
          <img
            src={arrow}
            alt="Arrow"
            className="w-5 h-5 md:w-6 md:h-6 cursor-pointer ml-2"
          />
        </div>

        {/* User/Login Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-sm md:text-lg truncate max-w-[150px]">{user.email}</h1>
            <button onClick={logout} className="text-red-500 underline text-sm md:text-base">
              Logout
            </button>
          </div>
        ) : (
          <div
            onClick={() => setLoginPop(true)}
            className="flex underline cursor-pointer hover:no-underline"
          >
            <h1 className="font-bold text-sm md:text-lg">Login</h1>
          </div>
        )}

        {/* Sell Button */}
        <Link
          to="/sell"
          className="flex items-center justify-center w-24 h-10 md:w-28 md:h-12 p-2 rounded-full border border-yellow-500 hover:bg-yellow-50 transition-colors duration-200"
        >
          <h1 className="font-bold text-sm md:text-lg">+SELL</h1>
        </Link>
      </div>

      {loginpop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;
