
type MenuProps={
  setMenu:(Value:string)=>void;
}


const MenuBar = ({setMenu}:MenuProps) => {
  return (
    <div className="flex shadow-sm h-10 p-2 text-md text font-semibold text-cyan-950 py-6" >
        <div className="flex shadow-sm h-10 p-2 ">
      <h1 onClick={() => setMenu("real Estate")} className="ml-5 cursor-pointer">Real Estate</h1>
      <h1 onClick={() => setMenu("mobiles")} className="ml-5 cursor-pointer">Mobiles</h1>
      <h1 onClick={() => setMenu("furniture")} className="ml-5 cursor-pointer">Furniture</h1>
      <h1 onClick={() => setMenu("books")} className="ml-5 cursor-pointer">Books</h1>
      <h1 onClick={() => setMenu("services")} className="ml-5 cursor-pointer">Services</h1>
      <h1 onClick={() => setMenu("cars")} className="ml-5 cursor-pointer">Cars</h1>
      <h1 onClick={() => setMenu("bikes")} className="ml-5 cursor-pointer">Bikes</h1>
      <h1 onClick={() => setMenu("electronics")} className="ml-5 cursor-pointer">Electronics</h1>
      <h1 onClick={() => setMenu("pets")} className="ml-5 cursor-pointer">Pets</h1>
      
      <h1 onClick={() => setMenu("")} className="ml-5 text-red-500 cursor-pointer">Reset Filter</h1> {/* Reset Button */}
    </div>
      
    </div>
  )
}

export default MenuBar

