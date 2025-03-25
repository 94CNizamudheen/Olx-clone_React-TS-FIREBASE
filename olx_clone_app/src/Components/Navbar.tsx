import logo from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import Login from "./Login";
import { useState } from "react";
import { useAuth } from "../AuthContext";

type SearchProp = {
  setSearch: (Value: string) => void;
};

const Navbar = ({ setSearch }: SearchProp) => {
  const [loginpop, setLoginPop] = useState(false);
  const { user, logout } = useAuth();
  return (
    <>
      <div className="flex p-4 bg-slate-100 shadow-md ">
        <img src={logo} alt="" className="w-11 h-9 " />
        <div className="flex border-2 border-spacing-1  w-64 p-2 border-black ml-5 rounded-md bg-white">
          <img src={lens} alt="" className="w-6 h-5 mt-1" />
          <input
            type="text"
            placeholder="location "
            className="ml-3 outline-none"
          />
          <img src={arrow} alt="" className="w-8 h-7" />
        </div>
        <div className="flex h-12 ml-4 border-2 border-black rounded-md ">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Find Car,Mobile and more..."
            className="ml-3 w-96 outline-none"
          />
          <img src={search} alt="" className="" />
        </div>
        <div className="flex h-12 p-3 ml-10">
          <h1 className="font-semibold ">English</h1>
          <img src={arrow} className="w-8 h-7 cursor-pointer" />
        </div>
        {user ? (
          <div className="flex items-center ml-10">
            <h1 className="font-bold text-lg">{user.email}</h1>
            <button onClick={logout} className="ml-4 text-red-500 underline">
              Logout
            </button>
          </div>
        ) : (
          <div
            onClick={() => setLoginPop(true)}
            className="flex h-12 p-3 ml-10 underline cursor-pointer hover:no-underline"
          >
            <h1 className="font-bold text-lg ">Login</h1>
          </div>
        )}

        <div className="w-28 flex h-12 p-2 ml-10 cursor-pointer rounded-full border border-yellow-500">
          <h1 className="ml-3 font-bold text-lg ">+SELL</h1>
        </div>
      </div>
      {loginpop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;
