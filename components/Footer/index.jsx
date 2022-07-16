import Image from "next/image"
import Link from "next/link";

export default function Footer(){
    return(
        <>
            <div className="max-w-screen-xl flex m-auto gap-4 py-3 px-5 items-center">
                <Image width={"40px"} height={"40px"} src={"https://cdn.divineshop.vn/static/b77a2122717d76696bd2b87d7125fd47.svg"} alt={"Ví MoMo"}/>
                <Image width={"40px"} height={"40px"} src={"https://cdn.divineshop.vn/static/72a3a36fc7c66085b3f442940ba45fde.svg"} alt={"Mobile Banking với VnPay"}/>
                <Image width={"40px"} height={"40px"} src={"https://cdn.divineshop.vn/static/464c7c79044dea88e86adf0e1b9c064c.svg"} alt={"Thẻ VISA"}/>
                <Image width={"40px"} height={"40px"} src={"https://cdn.divineshop.vn/static/ddb866eb1214c914ea62417879046b99.svg"} alt={"Thẻ Mastercard"}/>
                <span>và nhiều hình thức thanh toán khác</span>
            </div>
            <div className="bg-gray-100">
                <div className="max-w-screen-xl mx-auto px-5 py-3">
                    <div className="flex gap-2 border-b-2 pb-2">
                        <Link href={"https://www.facebook.com/welgames.vn"}>
                            <a>
                                <Image width={"30px"} height={"30px"} src="https://cdn.divineshop.vn/static/4ba68c7a47305b454732e1a9e9beb8a1.svg" alt="Facebook" />
                            </a>
                        </Link>
                        <Link href={"/"}>
                            <a>
                                <Image width={"30px"} height={"30px"} src="https://cdn.divineshop.vn/static/20334129395885adefc2e5217043f670.svg" alt="Youtube" />
                            </a>
                        </Link>
                        <Link href={"/"}>
                            <a>
                                <Image width={"30px"} height={"30px"} src="https://cdn.divineshop.vn/static/4ae438165f9d5ea0fc6ff3da6051f938.svg" alt="Instagram" />
                            </a>
                        </Link>
                    </div>
                    <div className="flex py-5 flex-wrap gap-x-56 gap-y-5">
                        <div>
                            <h5 className="uppercase font-bold mb-4">GIỚI THIỆU</h5>
                            <div className="flex flex-col gap-1">
                                <Link href={"/"}><a className="hover:underline">Game bản quyền là gì?</a></Link>
                                <Link href={"/about"}><a className="hover:underline">Giới thiệu Welgames</a></Link>
                                <Link href={"/"}><a className="hover:underline">Điều khoản dịch vụ</a></Link>
                                <Link href={"/"}><a className="hover:underline">Chính sách bảo mật</a></Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="uppercase font-bold mb-4">LIÊN HỆ</h5>
                            <div className="flex flex-col gap-1">
                                <p>Hotline: <Link href={"/"}><a className="hover:underline font-[500] text-red-500">1900 633 305</a></Link><br /> (Các ngày trong tuần từ 8h đến 24h)</p>
                                <p>Email hỗ trợ: <Link href={"/"}><a className="hover:underline font-[500]">support@welgames.vn</a></Link></p>
                                <Link href={"/"}><a className="hover:underline">Địa chỉ giao dịch trực tiếp</a></Link>
                                <Link href={"https://www.facebook.com/welgames.vn"}><a className="hover:underline">Fanpage CSKH</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}