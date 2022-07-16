import { useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person'
import Link from "next/link";
import * as base64 from 'base-64'
import HeaderAccountPopup from "./HeaderAccountPopup";
import { CSSTransition } from 'react-transition-group'
import { useState, useRef } from "react";
import LoginIcon from '@mui/icons-material/Login';
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const HeaderAccount = ({mb}) => {
    const loginState = useSelector(state => state.userLogin)
    const[isAccountVisible, setAccountVisible] = useState(false)
    const accountRef = useRef(null)
    const router = useRouter()

    return(
        <div onMouseOver={()=>{setAccountVisible(true)}} onMouseOut={()=>{setAccountVisible(false)}} className={`${!mb && 'hidden lg:flex'} w-full lg:w-fit items-center gap-2 flex group relative`}>
            <Link href={loginState ? '/profile' : '/signin'}>
                <div className={`flex justify-center items-center lg:hover:bg-opacity-25 cursor-pointer bg-opacity-0 bg-white border border-solid lg:border-white border-blue-500 rounded-full h-11 w-11 text-center leading-3`}>
                    { loginState ? <img src={JSON.parse(base64.decode(loginState))['avatar_path']} alt="" /> : <PersonIcon /> } 
                    
                </div>
            </Link>
            <div className='flex gap-2 font-medium'>
                {
                    loginState ? <Link href={'/profile'}><a className='hover:underline'>{JSON.parse(base64.decode(loginState))['username']}</a></Link> 
                    :
                    <>
                        <Link href={'/signin'}><a className='hover:underline'>Đăng nhập</a></Link>
                        <span>/</span>
                        <Link href={'/signup'}><a className='hover:underline'>Đăng ký</a></Link>
                    </>
                }
            </div>
            {loginState && <a onClick={() => {Cookies.remove('lg');router.reload()}} className="lg:hidden w-fit ml-auto bg-right text-white bg-gradient-to-r from-blue-500 to-blue-700 via-blue-400 bg-[length:200%] rounded px-3 py-2"><LoginIcon/></a>}

            {
                loginState && <CSSTransition nodeRef={accountRef} unmountOnExit in={isAccountVisible} classNames={"cart-animation"} timeout={50}>
                                <div ref={accountRef} className="hidden lg:block absolute top-0 -left-4 w-44 pt-[20px] mt-[30px] z-50 cursor-default transition-all">
                                    <HeaderAccountPopup/>
                                </div>
                            </CSSTransition>
            }
        </div>
    )
}

export default HeaderAccount