import NewsList from '../../../Utils/news.json'
import { NextSeo } from 'next-seo';
import nonAccentVietnamese from '../../../Utils/nonAccentVietnamese';
import moment from 'moment';
import parse from 'html-react-parser'

export const getServerSideProps = async (context) => {
    if(Number(context.params.slug[0])) {      
        const check = NewsList.filter(item => {
            if(item.id === context.params.slug[0]){
                return item
            }
        })
        
        if(check.length > 0){
            return{
                redirect: {
                    destination: '/news/item/' + nonAccentVietnamese(check[0].title).replace(/ /g, '-').toLowerCase().replace(/[^a-zA-Z- ]/g, "") + '-' + check[0].id,
                    permanent: true,
                }
            }
        }else{
            return{
                redirect: {
                    destination: '/',
                    permanent: true,
                }
            }
        }        
    } else {
        const idA = NewsList.filter((item,index) => {
            if((nonAccentVietnamese(item.title).replace(/ /g, '-').toLowerCase().replace(/[^a-zA-Z- ]/g, "") + '-' + item.id) === context.params.slug[0]){
                return item
            }
        })

        
        if(!idA.length > 0){
            return{
                redirect: {
                    destination: '/',
                    permanent: true,
                }
            }
        }
    
        const data = NewsList.filter(item => {
            if(item.id === idA[0].id){
                return item
            }
        })

        if(data[0]) data[0] = {
            ...data[0],
            date: moment.unix(data[0].date).format('ddd, DD/MM/YYYY')
        }

        return {
            props: { newsData: data[0] || null }
        }
    }
}

export default function NewsItem({ newsData }) {
    moment.locale('vi')

    return (
        <div className="max-w-screen-xl px-10 my-3 mx-auto">
            <NextSeo
                title={`${newsData.title}`}
                openGraph={{
                    url: `https://welgames.vercel.app/news/item/${nonAccentVietnamese(newsData.title).replace(/ /g, '-').toLowerCase() + '-' + newsData.id}`,
                    title: `${newsData.title}`,
                    images: [
                      {
                        url: 'https://welgames.vercel.app/assets/banner.png',
                        type: 'image/png',
                      },
                    ],
                    site_name: 'Welgames',
                  }}
            />
            <img className='w-full h-80 object-cover' src={newsData.preview_image} alt={newsData.title + " image"} />
            <h1 className='mt-10 mb-2 font-bold text-4xl'>{newsData.title}</h1>
            <p className='text-gray-500'>{newsData.date}</p>
            <div className='text-lg my-10'>
                {
                    parse(newsData.content)
                }
            </div>
        </div>
    )
}