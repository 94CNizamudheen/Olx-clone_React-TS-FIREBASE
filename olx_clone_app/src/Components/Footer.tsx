import cartrade from '../assets/cartrade_tech.svg'
import carWale from '../assets/carwale.svg';
import bikeWale from '../assets/bikewale.svg';
import carTrade2 from '../assets/cartrade.svg';
import olx2 from '../assets/olx-2.svg';
import mobility from '../assets/mobility (1).svg'


const Footer = () => {
    return (
        <footer className=" left-0 w-full bg-cyan-950 py-4 z-10">
      <div className="container mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-center border-r-2 border-white pr-6 md:pr-10">
          <img src={cartrade} alt="CarTrade Tech" className="h-20 md:h-32" />
        </div>


        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <img src={olx2} alt="OLX" className="h-12 md:h-24" />
          <img src={carWale} alt="CarWale" className="h-12 md:h-24" />
          <img src={bikeWale} alt="BikeWale" className="h-12 md:h-24" />
          <img src={carTrade2} alt="CarTrade" className="h-12 md:h-24" />
          <img src={mobility} alt="Mobility" className="h-12 md:h-24" />
        </div>
      </div>

      <div className="text-white text-xs text-center md:text-right mt-3 md:mt-0 px-4 md:mr-6">
        All rights reserved © 2006-{new Date().getFullYear()} OLX
      </div>
    </footer>

    )
}

export default Footer
