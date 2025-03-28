import { useState } from "react";
import MenuBar from "./MenuBar"
import Navbar from "./Navbar"
import Home from "./Home";
import Footer from "./Footer";

const Main = () => {

   
    const [search,setSearch]= useState("")
    const [menu,setMenu]=useState('');


  return (
    <div>
    <Navbar setSearch={setSearch}/>
    <MenuBar setMenu={setMenu} />
    <Home search={search} menu={menu} />
    <Footer />
    </div>
  )
}

export default Main
