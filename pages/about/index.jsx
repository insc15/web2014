import Logo from '../../assets/logo_colored.svg'
import Visual from '../../assets/visual.png'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import PercentIcon from '@mui/icons-material/Percent';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
//  
export default function About() {
    const Card = ({icon, name, content}) => {
        return (
            <div className="px-4 basis-[100%] sm:basis-[28%] relative mt-12 mx-3 rounded-2xl hover:bg-blue-400 transition-all duration-500 group pb-5">
                <div className='relative top-[-2rem] w-fit mx-auto mb-[-1.5rem] rounded-full bg-blue-500 border-8 border-transparent'>{icon}</div>
                <h5 className='text-[1.4rem] font-[700] mb-3'>{name}</h5>
                <p>{content}</p>
            </div>
        )
    }

    return(
        <>
            <div className="max-w-screen-lg px-5 md:px-10 pt-0 md:pt-12 my-3 mx-auto flex items-center justify-center flex-wrap flex-col-reverse md:flex-row relative">
                <NextSeo
                    title={`Giới thiệu Welgames`}
                    description={"Shop game bản quyền lớn và uy tín nhất Việt Nam. Bán game bản quyền giá rẻ, uy tín, nhanh chóng."}
                    openGraph={{
                        url: 'https://welgames.vercel.app/about',
                        title: `Giới thiệu Welgames`,
                        description: "Shop game bản quyền lớn và uy tín nhất Việt Nam. Bán game bản quyền giá rẻ, uy tín, nhanh chóng.",
                        images: [
                        {
                            url: 'https://welgames.vercel.app/assets/banner.png',
                            type: 'image/png',
                        },
                        ],
                        site_name: 'Welgames',
                    }}
                />
                <div className='md:w-1/2'>
                    <div className="flex w-fit items-center rounded text-blue-500">
                        <Image width={80} height={86} src={Logo} alt='Welgames'/>
                        <p className='text-4xl md:text-5xl uppercase font-bold ml-4'>Welgames</p>
                    </div>
                    <h1 className='text-2xl my-4'>Welgames là website phân phối game bản quyền lớn nhất và uy tín nhất Việt Nam.</h1>
                </div>
                <div className='md:w-1/2 relative top-[-2rem]'>
                    <Image width={486} height={561} src={Visual} alt="Visual"/>
                </div>
            </div>
            <div className='bg-blue-500 text-white py-20'>
                <div className="max-w-screen-lg px-5 md:px-10 mx-auto flex items-center justify-center flex-wrap">
                    <p className='text-4xl md:text-5xl font-bold text-center'>Đặc điểm nổi bật</p>
                    <p className='text-xl mt-4 text-center'>Chúng tôi không ngừng làm việc để mang lại các tính năng mới cho Welgames, như là:</p>
                    <div className='w-full flex flex-wrap my-12 text-center'>
                        <Card icon={<AccessTimeIcon sx={{fontSize: "4rem"}}/>} name={"Truy cập sớm các trò chơi"} content={"Khám phá, thưởng thức và đồng hành cùng trò chơi trong quá trình phát triển. Trở thành người đầu tiên chứng kiến những thay đổi và tham gia góp ý."} />
                        <Card icon={<PaymentIcon sx={{fontSize: "4rem"}}/>} name={"Mua hàng thật dễ dàng"} content={"Cửa hàng hỗ trợ nhiều hình thức thanh toán với hơn 35 đơn vị tiền tệ, mang lại cho bạn sự linh hoạt khi thanh toán."} />
                        <Card icon={<PercentIcon sx={{fontSize: "4rem"}}/>} name={"Hệ thống mã giảm giá"} content={"Hệ thống mã giảm giá được phát thường xuyên trong các sự kiện của Welgames hoặc từ các Streamer"} />
                        <Card icon={<CardMembershipIcon sx={{fontSize: "4rem"}}/>} name={"Khách hàng thân thiết"} content={"Khách hàng thân thiết của Welgames sẽ nhận được những ưu đãi vô cùng hấp dẫn"} />
                        <Card icon={<SupportAgentIcon sx={{fontSize: "4rem"}}/>} name={"Đội ngũ tư vấn nhiều kinh nghiệm"} content={"Đội ngũ tư vấn với nhiều năm kinh nghiệm sẽ giải đáp cho bạn tất cả các thắc mắc trong quá trình mua hàng và cài đặt sản phẩm"} />
                        <Card icon={<WorkspacePremiumIcon sx={{fontSize: "4rem"}}/>} name={"Cam kết bảo hành 100%"} content={"Cam kết bảo hành với mọi sản phẩm. Thông tin bảo hành từng sản phẩm đều được ghi chi tiết theo từng loại sản phẩm."} />
                    </div>
                </div>
            </div>
        </>
    )
}