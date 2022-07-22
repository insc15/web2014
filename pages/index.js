import Slider from "react-slick"
import Link from "next/link"
import currencyFormatter from "currency-formatter"
import List from "../components/List"
import { WindowIcon, AppleIcon } from "../components/Icon"
import FeaturedCategories from '../Utils/featuredcategories.json'
import GameList from '../Utils/allgames.json'
import { GetAllProduct } from "../Utils/FetchAPI/Product"
import News from "./news"

export const getServerSideProps = async () =>{
  // const product = await GetAllProduct()
  // console.log(product)

  const data = FeaturedCategories

  const data2 = GameList

  return {
    props: { featureGameData: data, allGameData: data2 }
  }
}

export default function Home({ featureGameData, allGameData }) {

  const ArrowsHide = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none"}}
        onClick={onClick}
      />
    );
  }

  const BannerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          nextArrow: <ArrowsHide/>,
          prevArrow: <ArrowsHide/>
        }
      }
    ]
  };


  return (
    <>
      <div className="max-w-screen-xl px-3 my-3 mx-auto">
        <Slider {...BannerSliderSettings}>
          {
            featureGameData.specials.items.sort(function(a, b){ return b.discount_percent - a.discount_percent }).map((item,index) => {
              return(
                <div key={index}>
                  <img className="object-cover w-full h-52 lg:h-[500px] sm:h-[300px]" src={item.large_capsule_image} alt={item.name + " image"}/>
                  <div className="gap-2 absolute top-0 bottom-0 left-0 right-0 p-10 sm:p-14 lg:p-20 text-white flex flex-col justify-end bg-gradient-to-r sm:bg-gradient-to-t from-black">
                    <div className="flex gap-2">
                      { item.windows_available ? <div className="flex gap-1 px-2 bg-gray-600 bg-opacity-50 rounded"><WindowIcon/><span>Windows</span></div> : null }
                      { item.mac_available ? <div className="flex gap-1 px-2 bg-gray-600 bg-opacity-50 rounded"><AppleIcon/><span>Mac</span></div> : null }
                    </div>
                    <div className="flex items-center font-bold gap-2">
                      <span className="py-1 text-sm px-2 lg:py-2 lg:text-[22px] bg-[#4c6b22] text-[#a4cf1e]">-{item.discount_percent}%</span>
                      <h1 className="truncate sm:text-2xl lg:text-4xl uppercase">{item.name}</h1>
                    </div>
                    <div className="px-2 w-fit bg-gray-600 bg-opacity-50">
                      <span className="text-xl text-[#95daff]">{currencyFormatter.format(item.final_price / 100, {code: "VND"})}</span>
                      <span className="ml-2 line-through text-[#6e8d9e]">{currencyFormatter.format(item.original_price / 100, {code: "VND"})}</span>
                    </div>
                    <Link href={"/product/"+ item.id}>
                      <a className="lg:mt-10 rounded px-3 py-2 lg:px-6 lg:py-4 w-fit bg-gradient-to-r from-blue-700 to-blue-500 hover:scale-105 transition-all">
                        Xem chi tiết sản phẩm
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </Slider>
        <List data={featureGameData.top_sellers}></List>
        <List data={featureGameData.coming_soon}></List>
        <List data={featureGameData.new_releases}></List>
        <List name={"Tất cả"} data={allGameData}></List>
        <News/>
      </div>
    </>
  )
}
