import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NextSeo } from 'next-seo';

export default function Help() {
    const Item = ({title, children}) => {
        return(
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {title}
                </AccordionSummary>
                <AccordionDetails>
                        {
                            children
                        }
                </AccordionDetails>
            </Accordion>
        )
    }

    return (
        <div className="max-w-screen-lg px-10 my-12 mx-auto">
            <NextSeo
                title={'Hỗ trợ Welgames'}
                description={`Hỗ trợ, hướng dẫn mua hàng trên Welgames.`}
                openGraph={{
                    url: 'https://welgames.vercel.app/help',
                    title: 'Hỗ trợ',
                    description: `Hỗ trợ, hướng dẫn mua hàng trên Welgames.`,
                    images: [
                      {
                        url: 'https://welgames.vercel.app/assets/banner.png',
                        type: 'image/png',
                      },
                    ],
                    site_name: 'Welgames',
                  }}
            />
            <h1 className="text-center text-4xl font-bold text-blue-500 mb-12">Hỗ trợ</h1>
            <Item title='Hướng dẫn mua hàng & thanh toán'>
                <div className='sm:leading-10'>
                    <p className="text-xl font-[500] my-3">Bước 1:</p>
                    <p>
                        Tìm kiếm và truy cập sản phẩm bạn muốn mua <br />
                        Nhấn Mua Ngay hoặc Thêm vào giỏ hàng nếu muốn mua thêm nhiều sản phẩm khác
                    </p>
                    <img src="/assets/guide/1.png"/>
                    <p className="text-xl font-[500] my-3">Bước 2:</p>
                    <p>
                        Ngồi đợi admin update chức năng giỏ hàng và thanh toán
                    </p>
                </div>
            </Item>
        </div>
    )
}