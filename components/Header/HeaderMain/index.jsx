import Config from '../../../Utils/config.json'
import Image from 'next/image'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PercentIcon from '@mui/icons-material/Percent';
import MapIcon from '@mui/icons-material/Map';
import PaymentIcon from '@mui/icons-material/Payment';
import Logo from '../../../assets/logo.svg'
import SideBar from "../SideBar";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import CartPopup from './Cart';
import { CSSTransition } from 'react-transition-group'
import HeaderAccount from '../HeaderAccount';

export default function HeaderMain() {
    const[isSideBarVisible, setSideBarVisible] = useState(false)
    const[isCartVisible, setCartVisible] = useState(false)
    const cartRef = useRef(null)

    const sideBar = useRef(null)
    const router = useRouter()
    //redux
    const cart = useSelector(state => state.cart)
    const loginState = useSelector(state => state.userLogin)
    
    useEffect(()=>{
        document.addEventListener('click',(e)=>{
            if(sideBar.current){
                if(sideBar.current === e.target){
                    setSideBarVisible(false)
                }
            }
        }, { capture: true })
    },[])

    useEffect(() => {
        setSideBarVisible(false)
    },[router.asPath])

    // useEffect(()=>{
    //     isSideBarVisible ? document.querySelector('body').style.overflow = 'hidden' : document.querySelector('body').style.overflow = 'visible'
    // },[isSideBarVisible])

    const setBody = () => {
        if(typeof window !== "undefined") { document.querySelector('body').style.overflow = isSideBarVisible ? 'hidden' : 'visible' }
    }

    const CartCount = () => {
        let counter = 0
        cart.map(i => {
            counter += Number(i.count)
        })
        return <span className='bg-white text-black px-1 rounded'>{counter}</span>
    }

    return (
        <div className="bg-blue-500 py-4">
            <Transition
                show={isSideBarVisible}
                enter="transition-all duration-300 ease-out"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition-all duration-300 ease-out"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
                className='z-[5] absolute top-0 w-full h-full -translate-x-full lg:hidden'
                beforeEnter={setBody()}
            >
                <SideBar onClicK={()=>{setSideBarVisible(false)}}/>
                <div ref={sideBar} className="z-10 absolute w-full h-full top-0"></div>
            </Transition>

            <div className="max-w-screen-xl mx-auto text-white grid grid-cols-3 sm:flex sm:justify-between items-center xl:px-3 px-10">
                <div className='lg:hidden'>
                    <MenuIcon onClick={() => {setSideBarVisible(!isSideBarVisible)}} fontSize='large' />
                </div>
                <Link href={"/"}>
                    <a className='flex items-center m-auto sm:m-0 hover:scale-105 transition-all'>
                        <Image width={50} height={52} src={Logo} alt='Welgames'></Image>
                        <p className='text-3xl font-medium ml-4 hidden sm:block'>Welgames</p>
                    </a>
                </Link>
                <div className='items-center w-1/3 sm:flex hidden'>
                    <input placeholder='ABC' type="text" className='focus:border focus:border-solid focus:hover:border-blue-900 hover:border hover:border-solid hover:border-blue-900 border border-solid border-blue-500 rounded-tl rounded-bl h-10 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
                    <div className="px-2 bg-blue-700 h-10 flex items-center rounded-tr rounded-br hover:cursor-pointer hover:bg-blue-600">
                        <SearchIcon></SearchIcon>
                    </div>
                </div>
                <HeaderAccount/>
                <div onMouseOver={()=>{setCartVisible(true)}} onMouseOut={()=>{setCartVisible(false)}} className='flex items-center gap-2 cursor-pointer border border-solid border-white rounded p-2 hover:bg-blue-400 font-medium w-fit ml-auto sm:m-0 relative'>
                    <div>
                        <ShoppingCartIcon />
                    </div>
                    <span className='hidden sm:block'>Cart</span>
                    {
                        CartCount()
                    }
                    <CSSTransition nodeRef={cartRef} unmountOnExit in={isCartVisible} classNames={"cart-animation"} timeout={50}>
                        <div ref={cartRef} className="hidden lg:block absolute top-0 right-0 w-[30em] pt-[20px] mt-[30px] z-50 cursor-default transition-all">
                            <CartPopup/>
                        </div>
                    </CSSTransition>
                </div>
            </div>

            <div className='px-10 xl:px-3 mt-4 max-w-screen-xl mx-auto justify-between text-white hidden lg:flex'>
                <Link href={"/"}>
                    <a className='hover:underline flex'>
                        <VisibilityIcon />
                        <span className='ml-2'>Sản phẩm bạn vừa xem</span>
                    </a>
                </Link>
                <Link href={"/"}>
                    <a className='hover:underline flex'>
                        <LocalFireDepartmentIcon />
                        <span className='ml-2'>Sản phẩm mua nhiều</span>
                    </a>
                </Link>
                <Link href={"/"}>
                    <a className='hover:underline flex'>
                        <PercentIcon />
                        <span className='ml-2'>Sản phẩm khuyến mại</span>
                    </a>
                </Link>
                <Link href={"/"}>
                    <a className='hover:underline flex'>
                        <MapIcon />
                        <span className='ml-2'>Đại lý giao dịch</span>
                    </a>
                </Link>
                <Link href={"/"}>
                    <a className='hover:underline flex'>
                        <PaymentIcon />
                        <span className='ml-2'>Hình thức thanh toán</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}