
type MenuProps={
  setMenu:(Value:string)=>void;
}


const MenuBar = ({setMenu}:MenuProps) => {
  return (
    <div className="flex shadow-sm h-10 p-2 " >
        <div className="flex shadow-sm h-10 p-2 ">
      <h1 onClick={() => setMenu("men's clothing")} className="ml-5">Men's Clothing</h1>
      <h1 onClick={() => setMenu("jewelery")} className="ml-5">Jewelry</h1>
      <h1 onClick={() => setMenu("electronics")} className="ml-5">Electronics</h1>
      <h1 onClick={() => setMenu("women's clothing")} className="ml-5">Women's Clothing</h1>
      <h1 onClick={() => setMenu("")} className="ml-5 text-red-500">Reset Filter</h1> {/* Reset Button */}
    </div>
      
    </div>
  )
}

export default MenuBar

