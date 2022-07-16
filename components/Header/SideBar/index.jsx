import Genres from "../../../Utils/genres.json"
import Link from "next/link"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Transition } from '@headlessui/react'
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from "react";
import HeaderAccount from '../HeaderAccount';

export default function SideBar({onClicK}) {
    const [isGenreMenuVisible, setGenreMenuVisible] = useState(false)

    return(
        <div className="bg-white max-w-[260px] w-full py-6 overflow-x-scroll h-full z-20 absolute shadow-2xl">
            <div className="items-center gap-2 flex group text-blue-500 px-4 pb-2">
                <HeaderAccount mb/>
            </div>

            <div onClick={() => { setGenreMenuVisible(!isGenreMenuVisible) }} className="px-6 py-2 pt-4 flex mt-2 border-t">
                <div>Danh mục</div>
                { isGenreMenuVisible ? <ExpandLessIcon className="ml-auto"/> :<ExpandMoreIcon className="ml-auto"/> }
            </div>
            <ul className={`pl-6 ${isGenreMenuVisible ? 'h-fit' : 'h-0 overflow-hidden'}`}>
                {
                    Object.keys(Genres).map((key,index) => {
                        return <Link key={index} href={"/genre/"+key}><li onClick={onClicK} className="block py-2 px-4 cursor-pointer hover:bg-gray-100 hover:text-blue-500">{Genres[key]}</li></Link>
                    })
                }
            </ul>

            <Link href={"/about"}><div className="pl-6 py-2 pt-4 border-t flex items-center my-2 gap-3"><InfoIcon className="text-blue-500"/><span className="leading-none">Giới thiệu</span></div></Link>
            <Link href={"/help"}><div className="pl-6 py-2 flex items-center my-2 gap-3"><BookIcon className="text-blue-500"/><span className="leading-none">Hỗ trợ</span></div></Link>
            <Link href={"/help"}><div className="pl-6 py-2 flex items-center my-2 gap-3"><PhoneIcon className="text-blue-500"/><span className="leading-none">Thông tin liên hệ</span></div></Link>
        </div>
    )
}