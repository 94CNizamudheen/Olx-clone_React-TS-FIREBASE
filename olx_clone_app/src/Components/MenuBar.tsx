
type MenuProps={
  setMenu:(Value:string)=>void;
}


const MenuBar = ({setMenu}:MenuProps) => {
  return (
    <div className="bg-white shadow-sm py-4">
    <div className="flex items-center px-4 overflow-x-auto whitespace-nowrap gap-6 text-sm md:text-md font-semibold text-cyan-950">
      <h1
        onClick={() => setMenu("real Estate")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Real Estate
      </h1>
      <h1
        onClick={() => setMenu("mobiles")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Mobiles
      </h1>
      <h1
        onClick={() => setMenu("furniture")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Furniture
      </h1>
      <h1
        onClick={() => setMenu("books")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Books
      </h1>
      <h1
        onClick={() => setMenu("services")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Services
      </h1>
      <h1
        onClick={() => setMenu("cars")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Cars
      </h1>
      <h1
        onClick={() => setMenu("bikes")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Bikes
      </h1>
      <h1
        onClick={() => setMenu("electronics")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Electronics
      </h1>
      <h1
        onClick={() => setMenu("pets")}
        className="cursor-pointer hover:text-cyan-700 transition-colors duration-200"
      >
        Pets
      </h1>
      <h1
        onClick={() => setMenu("")}
        className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-200"
      >
        Reset Filter
      </h1>
    </div>
  </div>
  )
}

export default MenuBar

