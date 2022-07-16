import Link from "next/link"
import Image from "next/image"
import Genres from "../../../Utils/genres.json"
import { useEffect, useRef, useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';

const items = [
    {
        image: "https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Nap-thesvg-30724.svg",
        name: "Tin Tức",
        href: "/news"
    },
    {
        image: "https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Gioi-thieu-ban-be-87652.svg",
        name: "Giới thiệu bạn bè",
        href: "/"
    },
    {
        image: "https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Lien-he-hop-tac-33199.svg",
        name: "Liên hệ hợp tác",
        href: "/"
    },
    {
        image: "https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Uu-dai-khach-vip-79547.svg",
        name: "Ưu đãi khách hàng VIP",
        href: "/"
    }
]

export default function HeaderBottom() {
    const [isVisible, setVisible] = useState(false)
    const categories = useRef(null)

    useEffect(()=>{
        document.addEventListener('click',(e)=>{
            if(categories.current){
                if(!categories.current.contains(e.target)){
                    setVisible(false)
                }
            }
        }, { capture: true })
    },[])

    return (
        <div className="border border-solid border-b-2 hidden lg:block relative">
            <div className="max-w-screen-xl mx-auto text-blue-900 font-medium flex items-center justify-between px-8 gap-3 xl:px-3">
                <div className="cursor-pointer px-2">
                    <div ref={categories} onClick={() => { setVisible(!isVisible) } } className="cursor-pointer group-hover:text-blue-500 hover:text-blue-500 items-center flex gap-1"><MenuIcon/>Danh mục</div>
                    <ul style={isVisible ? {display: "block"} : null} className="hidden absolute z-10 top-14 left-[21rem] bg-white rounded border">
                        {
                            Object.keys(Genres).map((key,index) => {
                                return <Link key={index} href={"/genre/"+key}><li className="py-2 px-4 cursor-pointer hover:bg-gray-100 hover:text-blue-500">{Genres[key]}</li></Link>
                            })
                        }
                    </ul>
                </div>
                <div className="flex gap-3">
                    {
                        items.map((item,index) => {
                            return (
                                <Link key={index} href={item.href}>
                                    <a className='hover:underline flex items-center py-2'>
                                        <Image width={35} height={35} src={item.image} />
                                        <span className='ml-2'>{item.name}</span>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}