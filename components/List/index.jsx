import Link from "next/link"
import { WindowIcon, AppleIcon } from "../Icon"
import currencyFormatter from "currency-formatter"

export default function List({ data, name }) {
    data.items.map(item =>{
        !item.id ? item.id = item.steam_appid : null
        if(!item.is_free){
            if(item.price_overview) {!item.original_price ? item.original_price = item.price_overview.initial : null}
            if(item.price_overview) {!item.final_price ? item.final_price = item.price_overview.final : null}
            if(item.price_overview) {!item.discount_percent ? item.discount_percent = item.price_overview.discount_percent : null}
        }else{
            !item.original_price ? item.original_price = null : null
            !item.final_price ? item.final_price = 0 : null
            !item.discount_percent ? item.discount_percent = 0 : null
        }
        
    })

    !data.name ? data.name = name : null


    return(
        <>
            <h2 className="font-bold uppercase text-2xl m-2 text-blue-500 lg:my-5 border-solid border-b-2 border-blue-500 pb-2">{data.name}</h2>
            <div className="flex flex-wrap">
            {
                data.items.map((item,index) => {
                return(
                        <div key={index} className="basis-1/2 lg:basis-1/4 p-2 relative">
                            <Link href={"/product/" + item.id}>
                                <a>
                                    <img className="rounded-xl object-cover w-full h-[25vw] min-h-[100px] lg:h-[150px] sm:h-[200px] cursor-pointer" src={item.large_capsule_image || item.header_image} alt={item.name + " image"}/>
                                    <div className="flex gap-2 text-white absolute top-3.5 left-[1.1rem]">
                                        { item.windows_available ? <div className="flex py-1 mt-1 gap-1 px-2 bg-blue-500 rounded"><WindowIcon/><span className="hidden sm:inline-block">Windows</span></div> : null }
                                        { item.mac_available ? <div className="flex py-1 mt-1 gap-1 px-2 bg-blue-500 rounded"><AppleIcon/><span className="hidden sm:inline-block">Mac</span></div> : null }
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <span className="hover:underline cursor-pointer">{item.name}</span>
                                    </div>
                                </a>
                            </Link>

                            {
                                data.id !== "cat_newreleases" && item.release_date && item.release_date.coming_soon ? null : 
                                    <div className="flex flex-wrap items-center gap-2 mt-2 font-bold">
                                        {
                                            item.original_price !== null && item.discount_percent !== 0 ? <span className="rounded h-fit py-1 px-1 bg-[#4c6b22] text-[#dfff7f]">-{item.discount_percent}%</span> : null
                                        }
                                        {
                                            item.final_price !== 0 ? <span>{currencyFormatter.format(item.final_price / 100, {code: "VND"})}</span> : data.id !== "cat_comingsoon" ? <span>Miễn phí</span>: null
                                        }
                                        {
                                            item.discount_percent !== 0 ? <span className="line-through text-gray-400">{currencyFormatter.format(item.original_price / 100, {code: "VND"})}</span> : null
                                        }
                                    </div>
                            }
                        </div>
                )
                })
            }
            </div>
        </>
    )
}