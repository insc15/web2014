import NewsList from '../../Utils/news.json'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/vi'
import Link from 'next/link'
import nonAccentVietnamese from '../../Utils/nonAccentVietnamese'

export default function News() {
    const NewsListSorted = NewsList.sort((a, b) => a.date - b.date)
    moment.locale('vi')

    return (
        <div className="max-w-screen-xl px-3 my-3 mx-auto">
            <NextSeo
                title={`Tin tức`}
                description={`Tin tức mới nhất từ Welgames`}
                openGraph={{
                    url: `https://welgames.vercel.app/news`,
                    title: `Tin tức`,
                    description: `Tin tức mới nhất từ Welgames`,
                    images: [
                        {
                            url: 'https://welgames.vercel.app/assets/banner.png',
                            type: 'image/png',
                        },
                    ],
                    site_name: 'Welgames',
                }}
            />
            <h1 className="font-bold text-2xl m-2 text-blue-500 lg:my-5 border-solid border-b-2 border-blue-500 pb-2">Tin tức mới</h1>
            <div className="grid sm:grid-cols-5 px-2 gap-5">
                <Link href={`/news/item/${NewsListSorted[0].id}`}>
                <div className="col-span-3 sm:row-span-2 group relative rounded-xl overflow-hidden cursor-pointer">
                    <img className='w-full object-cover h-full group-hover:scale-105 duration-300 transition-all pointer-events-none' src={NewsListSorted[0].preview_image} />
                    <div className='absolute bottom-0 p-5 sm:p-10 w-full text-white font-bold bg-gradient-to-t from-black bg-opacity-40'>
                        <h2 className='text-sm lg:text-2xl uppercase border-b border-solid border-transparent group-hover:border-white transition-all w-fit'>{NewsListSorted[0].title}</h2>
                        <p className='text-sm lg:text-base text-gray-200 font-normal'>{moment.unix(NewsListSorted[0].date).calendar()}</p>
                    </div>
                </div>
                </Link>
                <Link href={`/news/item/${NewsListSorted[0].id}`}>
                <div className="col-span-3 sm:col-span-2 group relative rounded-xl overflow-hidden cursor-pointer">
                    <img className='w-full object-cover h-full group-hover:scale-105 duration-300 transition-all pointer-events-none' src={NewsListSorted[1].preview_image} />
                    <div className='absolute bottom-0 p-5 lg:p-10 w-full text-white font-bold bg-gradient-to-t from-black bg-opacity-40'>
                        <h2 className='text-sm lg:text-2xl uppercase border-b border-solid border-transparent group-hover:border-white transition-all w-fit'>{NewsListSorted[1].title}</h2>
                        <p className='text-sm lg:text-base text-gray-200 font-normal'>{moment.unix(NewsListSorted[1].date).calendar()}</p>
                    </div>
                </div>
                </Link>
                <Link href={`/news/item/${NewsListSorted[0].id}`}>
                <div className="col-span-3 sm:col-span-2 group relative rounded-xl overflow-hidden cursor-pointer">
                    <img className='w-full object-cover h-full group-hover:scale-105 duration-300 transition-all pointer-events-none' src={NewsListSorted[2].preview_image} />
                    <div className='absolute bottom-0 p-5 lg:p-10 w-full text-white font-bold bg-gradient-to-t from-black bg-opacity-40'>
                        <h2 className='text-sm lg:text-2xl uppercase border-b border-solid border-transparent group-hover:border-white transition-all w-fit'>{NewsListSorted[2].title}</h2>
                        <p className='text-sm lg:text-base text-gray-200 font-normal'>{moment.unix(NewsListSorted[2].date).calendar()}</p>
                    </div>
                </div>
                </Link>
            </div>

            <h1 className="font-bold text-2xl mx-2 text-blue-500 mt-5 pb-2">Tất cả</h1>
            <div className="flex flex-wrap gap-y-5 px-2">
                {
                    NewsListSorted.map((item,index) => {
                        return(
                            <Link key={index} href={`/news/item/${item.id}`}>
                                <div className='flex lg:flex-nowrap flex-wrap gap-4 basis-full lg:basis-1/2 cursor-pointer group'>
                                    <img className="rounded-xl object-cover h-56 w-full sm:w-60 sm:h-32 cursor-pointer" src={item.preview_image} alt={item.title + " image"}/>
                                    <div className="flex flex-wrap flex-col lg:flex-row mr-5 h-fit w-[55%]">
                                        <p className='lg:basis-full text-gray-400'>{moment.unix(item.date).format('ddd DD/MM/YYYY')}</p>
                                        <p className="lg:basis-full group-hover:underline cursor-pointer font-[500]">{item.title}</p>
                                        <p className='lg:basis-full mt-5 text-gray-600'>Read More</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}