import { useEffect, useState } from "react";
import MenuBar from "./MenuBar"
import Navbar from "./Navbar"
import Home from "./Home";
import Footer from "./Footer";

const Main = () => {

    const [products,setProducts]=useState([]);
    const [search,setSearch]= useState("")
    const [menu,setMenu]=useState('');

    const getProducts=async()=>{
        try {
          const res=  await fetch('https://fakestoreapi.com/products');
          const json=await res.json();
          setProducts(json);
            
        } catch (error) {
            console.error(error);
            
        }
    };

    useEffect(()=>{
        getProducts();
    },[])

  return (
    <div>
    <Navbar setSearch={setSearch}/>
    <MenuBar setMenu={setMenu} />
    <Home products={products} search={search} menu={menu} />
    <Footer/>
    </div>
  )
}

export default Main
