import { useState, useContext } from 'react';
import { TransactionContext } from "../context/TransactionContext";
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../images/logo-cryptex5.png';

const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={ `mx-4 cursor-pointer ${classProps}` }>
            { title }
        </li>
    );
}

const Navbar = () => {
    // Mobile state
    const [toggleMenu, setToggleMenu] = useState(false);
    const { connectWallet, currentAccount } = useContext( TransactionContext );


    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="Logo" className="w-32 cursor-pointer rounded-lg border-x-2" />
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                <li  
                    className={ `mx-4 cursor-pointer` }
                    onClick={ connectWallet } >
                    Wallet
                </li>
                <li  className={ `mx-4 cursor-pointer` }>
                    <a href="https://studioeternal.net/blog" target="_blank">
                        Blog
                    </a>
                </li>
                {["Market", "Exchange"].map((item, index) => (
                    <NavbarItem key={ item + index } title={ item } />
                ))}
                
                <li className="bg-[#007085] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#005065]">
                    Login
                </li>
            </ul>

            {/* Mobile Navigation */}
            <div className='flex relative'>
                {/* Toggle Button  */}
                { toggleMenu 
                    ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} /> 
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} /> }

                {toggleMenu && (
                    <ul
                        className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl 
                        md:hidden list-none flex flex-col justify-start items-end rounded-md
                        blue-glassmorphism text-white animate-slide-in '
                    >
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                        </li>
                        <li  
                            className={ `mx-4 cursor-pointer` }
                            onClick={ connectWallet } >
                            Wallet
                        </li>
                        <li  className={ `mx-4 cursor-pointer` }>
                            <a href="https://studioeternal.net/blog" target="_blank">
                                Blog
                            </a>
                        </li>

                        {["Market", "Exchange"].map((item, index) => (
                            <NavbarItem key={ item + index } title={ item } classProps="my-2 text-lg" />
                        ))}
                        
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;