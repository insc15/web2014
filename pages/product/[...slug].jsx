import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { useEffect, useRef, useState } from 'react';
import '@splidejs/splide-extension-video/dist/css/splide-extension-video.min.css';
import { WindowIcon, AppleIcon } from "../../components/Icon"
import currencyFormatter from "currency-formatter"
import parse from 'html-react-parser'
import percentDiff from 'percentage-difference'
import ReviewList from "../../Utils/review.json"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import GameList from '../../Utils/allgames.json'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import slugify from 'slugify';
import { useDispatch } from 'react-redux';
import { Cart } from '../../redux/action';

export const getServerSideProps = async (context) => {
    const id = context.params.slug[0];

    const data = GameList.items.filter(item => {
        if (item.steam_appid.toString() === id) {
            return item
        }
    })

    const review = ReviewList.filter(item => {
        if(item[id]) return item
    })

    if(!data[0]){
        return{
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    return{
        props: { gameData: data[0], reviewList: review[0][id] }
    }
}

export default function Product({ gameData, reviewList }) {
    const mainRef = useRef(null)
    const thumbsRef = useRef(null)
    const router = useRouter()
    const dispatcher = useDispatch()

    const mainOptions = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        // gap       : '1rem',
        pagination: false,
        autoHeight: true
    };

    const thumbsOptions = {
        type: 'slide',
        rewind: true,
        gap: '1rem',
        pagination: false,
        fixedWidth: 150,
        fixedHeight: 90,
        cover: true,
        // focus       : 'center',
        isNavigation: true,
    };


    const gameMedia = gameData.movies ? gameData.movies.concat(gameData.screenshots) : gameData.screenshots

    useEffect(() => {
        router.replace(router.basePath +'/product/' + gameData.steam_appid + '/' + slugify(gameData.name))

        if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
        }
    }, [])

    const onSlideMove = () => {
        mainRef.current.splideRef.current.querySelectorAll('video').forEach(element => {
            if (!element.paused) {
                element.pause()
            }
        });
    }

    return (
        <div className="max-w-screen-xl px-3 my-3 mx-auto">
            <NextSeo
                title={`${gameData.name} trên Welgames`}
                description={`Mua ${gameData.name} giá rẻ, uy tín nhất Việt Nam.`}
                openGraph={{
                    url: `https://welgames.vercel.app/product/${gameData.steam_appid}/${slugify(gameData.name)}`,
                    title: gameData.name,
                    description: `Mua ${gameData.name} giá rẻ, uy tín nhất Việt Nam.`,
                    images: [
                      {
                        url: gameData.header_image,
                        type: 'image/png',
                      },
                    ],
                    site_name: `${gameData.name} | Welgames`,
                  }}
            />
            <h1 className='font-[500] text-4xl mb-5'>{gameData.name}</h1>
            <div className="flex flex-wrap-reverse md:flex-row md:flex-nowrap gap-x-8 gap-y-5">
                <div className='w-full md:w-2/3'>
                    <Splide className='rounded-xl overflow-hidden' onMove={onSlideMove} options={mainOptions} ref={mainRef} >
                        {
                            gameMedia.map((item, index) => {
                                return (
                                    <SplideSlide key={index}>
                                        {/* <video controls key={index} src={item.mp4.max}></video> */}
                                        {item.mp4 ? <video autoPlay muted controls key={index} src={item.mp4.max}></video> : <img key={index} src={item.path_full} />}
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>

                    <Splide options={thumbsOptions} ref={thumbsRef}>
                        {
                            gameMedia.map((item, index) => {
                                return (
                                    <SplideSlide className='rounded-lg overflow-hidden' key={index}>
                                        {/* <video controls key={index} src={item.mp4.max}></video> */}
                                        {item.mp4 ? <img key={index} src={item.thumbnail}></img> : <img key={index} src={item.path_full} />}
                                    </SplideSlide>
                                )
                            })
                        }
                    </Splide>

                    <div className='text-white flex gap-2 flex-wrap'>
                        {
                            gameData.categories.map((item, index) => {
                                return <span key={index} className='gap-1 px-2 bg-blue-500 rounded'>{item.description}</span>
                            })
                        }
                    </div>

                    <p className='my-5 text-xl font-bold text-blue-500'>Thông tin về trò chơi: </p>
                    {
                        parse(gameData.about_the_game)
                    }
                    <p className='my-5 text-xl font-bold text-blue-500'>Yêu cầu phần cứng: </p>
                    <div className='grid lg:grid-cols-2 my-5 gap-5'>
                        <div>
                        {
                            parse(gameData.pc_requirements.minimum)
                        }
                        </div>
                        {
                            gameData.pc_requirements.recommended && <div>
                            {
                                parse(gameData.pc_requirements.recommended)
                            }
                            </div>
                        }
                    </div>
                </div>
                <div className='w-full md:w-1/4 h-fit md:sticky top-16'>{/*h-fit md:sticky top-16*/}
                    <img className='w-full rounded-xl' src={gameData.header_image} alt={gameData.name + "image"} />

                    <div className='text-white flex gap-2 flex-wrap mt-3'>
                        {
                            gameData.genres && gameData.genres.map((item, index) => {
                                return <Link key={index} href={"/genres/" + item.id}><a className='hover:underline gap-1 px-2 bg-blue-500 rounded'>{item.description}</a></Link>
                            })
                        }
                    </div>

                    {
                        gameData.release_date.coming_soon ? null :
                            <div className="flex flex-wrap items-center gap-2 my-4 font-bold text-2xl">
                                {
                                    gameData.price_overview && gameData.price_overview.initial !== null && gameData.price_overview.discount_percent !== 0 ? <span className="rounded h-fit py-1 px-1 bg-[#4c6b22] text-[#dfff7f]">-{gameData.price_overview.discount_percent}%</span> : null
                                }
                                {
                                    gameData.price_overview && <span>{gameData.price_overview.final !== 0 ? currencyFormatter.format(gameData.price_overview.final / 100, { code: "VND" }) : "Miễn phí"}</span>
                                }
                                {
                                    gameData.price_overview && gameData.price_overview.discount_percent !== 0 ? <span className="line-through text-gray-400">{currencyFormatter.format(gameData.price_overview.initial / 100, { code: "VND" })}</span> : null
                                }
                                {
                                    !gameData.price_overview && <span className="h-fit py-1 px-1">Miễn phí</span>
                                }
                            </div>
                    }
                    <button className={`text-white rounded mt-5 py-4 px-6 w-full transition-all ${gameData.release_date.coming_soon ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-700 to-blue-500 hover:scale-105"}`}>
                        <PaidIcon/> {gameData.price_overview ? "Mua ngay" : "Nhận miễn phí"}
                    </button>
                    <button onClick={()=>{dispatcher(Cart("ADD",{gameID: gameData.steam_appid, image: gameData.header_image, name: gameData.name, is_free: gameData.is_free,price_overview: gameData.price_overview}))}} className={`text-white rounded mt-5 py-4 px-6 w-full transition-all ${gameData.release_date.coming_soon ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-700 to-blue-500 hover:scale-105"}`}>
                        <AddShoppingCartIcon /> Thêm vào giỏ hàng
                    </button>
                    <div className="font-[500] mt-4">
                        <div className='flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Mã sản phẩm: </p><span className='text-right'>{gameData.steam_appid}</span></div>
                        <div className='flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Nhà phát triển: </p><span className='text-right'>{gameData.developers.join(', ')}</span></div>
                        <div className='flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Nhà phát hành: </p><span className='text-right'>{gameData.publishers.join(', ')}</span></div>
                        <div className='flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Ngày ra mắt: </p><span className='text-right'>{gameData.release_date.date}</span></div>

                        <div className='flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Nền tảng: </p><span className='text-right flex gap-2'>
                            {gameData.platforms.windows ? <div className="px-2 py-1 bg-blue-500 rounded"><WindowIcon /></div> : null}
                            {gameData.platforms.mac ? <div className="px-2 py-1 bg-blue-500 rounded"><AppleIcon /></div> : null}
                        </span></div>

                        <div className='flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Đánh giá: </p>
                            <span className={`${percentDiff(reviewList.query_summary.total_positive, reviewList.query_summary.total_negative, true) < 50 ? 'text-[#009944]' : 'text-[#cf000f]'} text-right`}>
                            {
                                reviewList.query_summary.review_score_desc
                            }
                        </span></div>

                        <button onClick={()=>{(typeof window !== 'undefined') && window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, 'newwindow','width=300,height=250')}} className={`text-white rounded mt-5 py-1 px-3 w-fit transition-all bg-blue-600 hover:scale-105`}>
                            <FacebookOutlinedIcon/> Chia sẻ
                        </button>

                        {/* <div className='flex-wrap flex justify-between border-b-2 border-blue-200 py-2'><p className='min-w-[120px] text-blue-700'>Ngôn ngữ: </p>
                            <span className={`max-w-[150px] text-right overflow-hidden ${!isLangVisible && "h-16"}`}>
                            {
                                gameData.supported_languages.split(",").map(item => {
                                    return <div className='font-normal'>{parse(item)}</div>
                                })
                            }
                            </span>
                            { gameData.supported_languages.split(",").length > 2 && <div className='flex-[1_1_100%] text-right'><span onClick={()=>{setLangVisible(!isLangVisible)}} className='cursor-pointer hover:underline'>Xem thêm</span></div>}
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}