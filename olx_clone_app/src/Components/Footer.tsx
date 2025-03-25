import cartrade from '../assets/cartrade_tech.svg'
import carWale from '../assets/carwale.svg';
import bikeWale from '../assets/bikewale.svg';
import carTrade2 from '../assets/cartrade.svg';
import olx2 from '../assets/olx-2.svg';
import mobility from '../assets/mobility (1).svg'


const Footer = () => {
    return (
        <footer className='bg-cyan-950 py-6'>
            <div className='container mx-auto flex items-center justify-between px-10'>
                <div className='flex items-center border-r-2 border-white pr-10'>
                    <img src={cartrade} alt="" className='h-40'/>
                </div>
                <div className='flex items-center space-x-10'>
                    <img src={olx2} alt="" className="h-28"/>
                    <img src={carWale} alt="" className="h-28"/>
                    <img src={bikeWale} alt="" className="h-28" />
                    <img src={carTrade2} alt="" className="h-28" />
                    <img src={mobility} alt=""  className="h-28"/>
                </div>
               
            </div>
            <div className='text-end text-white text-sm mr-6'>
                    All rights reserved © 2006-{new Date().getFullYear()} OLX
                </div>
        </footer>

    )
}

export default Footer
