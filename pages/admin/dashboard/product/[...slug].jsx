import DashboardSideBar from '../../../../components/DashboardSideBar';
import { GetAllProduct } from '../../../../Utils/FetchAPI/Product';
import { WhiteLayout } from '../../../../components/Layout';

export const getServerSideProps = async (context) => {
    const id = context.params.slug[0];
    const GameList = await GetAllProduct()

    const data = GameList.filter(item => {
        if (item.product_id === id) {
            return item
        }
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
        props: { gameData: data[0] }
    }
}

export default function DashboardProductDetails({ gameData }) {
    return(
        <div className='flex'>
            <DashboardSideBar/>
            <section className="basis-4/5 py-16 px-10 min-h-screen">
                <h3 className="font-semibold text-3xl leading-10">Chỉnh sửa sản phẩm</h3>
                <div className='mt-12' style={{ height: 400, width: '100%' }}>

                    
                </div>
            </section>
        </div>
    )
}

DashboardProductDetails.Layout = WhiteLayout