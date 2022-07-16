import GenresList from '../../Utils/genres.json'
import GameList from '../../Utils/allgames.json'
import List from '../../components/List'
import { NextSeo } from 'next-seo';
import nonAccentVietnamese from '../../Utils/nonAccentVietnamese';

export const getServerSideProps = async (context) => {
    if(Number(context.params.slug[0])) {      
        const check = Object.keys(GenresList).filter((key,index) => {
            if(key.toString() === context.params.slug[0]){
                return GenresList[key]
            }
        })

        if(check.length > 0){
            return{
                redirect: {
                    destination: '/genre/' + nonAccentVietnamese(GenresList[context.params.slug[0]]).replace(/ /g, '-').toLowerCase(),
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
        const idA = Object.keys(GenresList).filter((key,index) => {
            if(nonAccentVietnamese(GenresList[key]).replace(/ /g,'-') === nonAccentVietnamese(context.params.slug[0]) || key.toString() === context.params.slug[0]){
                return key
            }
        })
    
        const id = idA[0]

        if(!id){
            return{
                redirect: {
                    destination: '/',
                    permanent: true,
                }
            }
        }
    
        const data = GameList.items.filter(item => {
            const data2 = item.genres && item.genres.filter(item2 => {
                if (item2.id.toString() === id) {
                    return item2
                }
            })
            if (data2 && data2.length !== 0) return item
        })

        return {
            props: { gameData: data || [], genreName: GenresList[id] }
        }
    }
}

export default function Genres({ gameData, genreName }) {

    return (
        <div className='max-w-screen-xl px-3 my-3 mx-auto'>
            <NextSeo
                title={`Thể loại ${genreName}`}
                description={`Duyệt tìm thể loại ${genreName} trên Welgames.`}
                openGraph={{
                    url: `https://welgames.vercel.app/genre/${nonAccentVietnamese(genreName).replace(/ /g, '-').toLowerCase()}`,
                    title: `Thể loại: ${genreName}`,
                    description: `Duyệt tìm thể loại ${genreName} trên Welgames.`,
                    images: [
                      {
                        url: 'https://welgames.vercel.app/assets/banner.png',
                        type: 'image/png',
                      },
                    ],
                    site_name: 'Welgames',
                  }}
            />
            {
                gameData.length > 0 ? <List data={{ items: gameData }} name={"Thể loại: " + genreName} /> :
                    <div>
                        <h1 className="font-bold text-2xl m-2 text-blue-500 lg:my-5 border-solid border-b-2 border-blue-500 pb-2">Thể loại: {genreName}</h1>
                        <p className='py-16 md:py-36 lg:py-56 text-2xl font-bold text-center w-full'>Không có sản phẩm :((</p>
                    </div>
            }
            {/* <List data={{ items: gameData }} name={"Thể loại: " + genreName} /> */}
        </div>
    )
}