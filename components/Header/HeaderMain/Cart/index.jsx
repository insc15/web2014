import { useDispatch, useSelector } from "react-redux"
import currencyFormatter from "currency-formatter"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import Link from "next/link"
import { Cart } from "../../../../redux/action";

export default function CartPopup() {
    const CartState = useSelector(state => state.cart)
    const dispatcher = useDispatch()

    return(
        <>
            <div className="absolute right-8 top-[12px]" style={{borderBottom: "10px solid rgb(255, 255, 255)",borderLeft: "14px solid transparent",borderRight: "14px solid transparent"}}></div>
            <div className="rounded p-2 bg-white shadow-xl">
                <p className="text-black font-normal mb-2">Sản phẩm đã thêm</p>
                {
                    CartState.length > 0 ? CartState.map((item,index) => {
                        return( 
                            <Link href={"/product/" + item.gameID} key={index}>
                                <a className={`flex text-blue-500 hover:bg-gray-100 rounded ${index !== CartState.length - 1 && 'mb-2'}`}>
                                    <div className="basis-1/3 mr-3 rounded overflow-hidden">
                                        <img src={item.image} />
                                    </div>
                                    <div className="basis-1/2">
                                        <p className="line-clamp-2">{item.name}</p>
                                        <div className="flex">
                                            <p className="mr-3">x{item.count}</p>
                                            <p className="text-black">{currencyFormatter.format((item.price_overview.final / 100) * item.count, { code: "VND" }) }</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mx-auto">
                                        <IconButton className={"hover:scale-110 transition-all text-black hover:text-blue-500"} onClick={(e) => {e.preventDefault(); dispatcher(Cart("REMOVE", item.gameID))}}>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                    </div>
                                </a>
                            </Link>
                        )
                    }) 
                    :
                    <div className="h-24 text-gray-500 font-normal flex items-center justify-center">
                        <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                    </div>
                }
                { CartState.length > 0 && <Link href={"#"}><a className="block w-fit ml-auto hover:bg-left bg-right text-white bg-gradient-to-r from-blue-500 to-blue-700 via-blue-400 bg-[length:200%] rounded mt-5 py-2 px-8 transition-all duration-300">Thanh toán</a></Link> }
            </div>
        </>
    )
}