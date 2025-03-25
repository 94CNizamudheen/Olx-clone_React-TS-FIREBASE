import {  Link } from "react-router-dom";

type Product={
    id:number;
    title:string;
    image:string;
    price:number;
    category:string;
    description:string;
    
   
}
type ProductsProp={
    products:Product[];
    search:string;
    menu:string;
}

const Home = ({products,search, menu}:ProductsProp) => {
  return(
    <div className="grid grid-cols-4 ml-3 mt-3">
       {products?.filter((data)=>data.title.toLowerCase().includes(search?.toLowerCase())&&
       (menu?data.category.toLowerCase()===menu.toLowerCase():true)).map((data)=>(
        <Link to="/details" state={{data:data}} >
        <div key={data.id} className="border border-spacing-1 p-2" >
          <img src={data?.image} alt=""  className="w-60 h-48"/>
          <h1 className="font-bold text-xl">{data?.title}</h1>
          <h1>₹ {data?.price}</h1>
          <h1>₹ {data?.category}</h1>
        </div>
        </Link>
        
       ))
       }
    </div>
  )
  
}


export default Home
