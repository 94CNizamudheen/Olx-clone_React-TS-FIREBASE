
type MenuProps={
  setMenu:(Value:string)=>void;
}


const MenuBar = ({setMenu}:MenuProps) => {
  return (
    <div className="flex shadow-sm h-10 p-2 " >
        <div className="flex shadow-sm h-10 p-2 ">
      <h1 onClick={() => setMenu("men's clothing")} className="ml-5 cursor-pointer">Men's Clothing</h1>
      <h1 onClick={() => setMenu("car")} className="ml-5 cursor-pointer">Car</h1>
      <h1 onClick={() => setMenu("electronics")} className="ml-5 cursor-pointer">Electronics</h1>
      <h1 onClick={() => setMenu("Bike")} className="ml-5 cursor-pointer">Bike</h1>
      <h1 onClick={() => setMenu("")} className="ml-5 text-red-500 cursor-pointer">Reset Filter</h1> {/* Reset Button */}
    </div>
      
    </div>
  )
}

export default MenuBar

