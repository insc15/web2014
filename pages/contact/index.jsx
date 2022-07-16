import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import MapIcon from '@mui/icons-material/Map';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Link from 'next/link';
import { NextSeo } from 'next-seo';

export default function Contact() {
    const { register, handleSubmit, reset, getValues, setError, formState: { errors } } = useForm();

    const onSubmit = data => console.log(data);

    return(
        <div className="max-w-screen-xl mx-auto px-10 my-12">
            <NextSeo
                title={`Liên hệ`}
                description={`Liên hệ và hỗ trợ. Các hình thức liên hệ với Welgames. HOTLINE: 1900 633 305. EMAIL: support@welgames.vn. FANPAGE: Welgames - Game bản quyền​.`}
                openGraph={{
                    url: 'https://welgames.vercel.app/contact',
                    title: `Liên hệ`,
                    description: `Liên hệ và hỗ trợ. Các hình thức liên hệ với Welgames. HOTLINE: 1900 633 305. EMAIL: support@welgames.vn. FANPAGE: Welgames - Game bản quyền​.`,
                    images: [
                      {
                        url: 'https://welgames.vercel.app/assets/banner.png',
                        type: 'image/png',
                      },
                    ],
                    site_name: 'Welgames',
                  }}
            />
            <h1 className="text-center text-4xl font-bold text-blue-500 mb-3">Liên hệ với chúng tôi</h1>
            <p className="text-center text-gray-500">Có vấn đề cần giải đáp ? Hãy gửi câu hỏi cho chúng tôi !</p>
            <div className="my-14 flex max-w-screen-lg rounded-xl mx-auto overflow-hidden bg-white p-2 flex-wrap">
                <div className="w-full lg:w-1/3 p-8 text-white rounded-xl bg-[url('/assets/bg.png')] bg-cover bg-no-repeat bg-bottom">
                    <p className='text-2xl mb-2'>Thông tin liên hệ</p>
                    <p className="text-gray-300">Điền thông tin vào biểu mẫu và chúng tôi sẽ liên hệ lại với bạn trong vòng 24h tới.</p>
                    <div className="py-12 pl-4 flex gap-4 flex-col">
                        <Link href={"tel:1900633305"}><a className='flex gap-5 hover:underline w-fit'><PhoneIcon/>1900 633 305</a></Link>
                        <Link href={"mailto:support@welgames.vn"}><a className='flex gap-5 hover:underline w-fit'><MailIcon/>support@welgames.vn</a></Link>
                        <p className='flex gap-5'><MapIcon/>Số 47 Phạm Văn Đồng, TP Hà Nội</p>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7447.274769088111!2d105.77840610676739!3d21.047190371742616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454cd40c1a281%3A0xc2692f3be0f368ec!2zNDcgUGjhuqFtIFbEg24gxJDhu5NuZywgTWFpIEThu4tjaCwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1652948588510!5m2!1sen!2s" width={"100%"} style={{border: 0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="w-full lg:w-2/3 px-12 py-10">
                    <form className='grid gap-12' onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="Họ và tên" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: "#000"}}} variant="standard" {...register("name")}/>
                        
                        <TextField label="Email" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: "#000"}}} variant="standard" {...register("mail")}/>
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}

                        <div>
                            <p className='text-lg'>Vấn đề của bạn là gì?</p>
                            <RadioGroup defaultValue={'transaction'} row {...register("problem")}>
                                <FormControlLabel value={'transaction'} control={<Radio/>} label="Giao dịch"/>
                                <FormControlLabel value={'game'} control={<Radio/>} label="Trò chơi"/>
                                <FormControlLabel value={'promotion'} control={<Radio/>} label="Ưu đãi"/>
                            </RadioGroup>
                        </div>

                        <TextField label="Miêu tả chi tiết" multiline rows={4} placeholder="Nhập gì đó vào đây..." InputLabelProps={{style: {color: "#000"}}} variant="standard" {...register("content")}/>
                        
                        <button type='submit' className="ml-auto hover:bg-left bg-right text-white bg-gradient-to-r from-blue-500 to-blue-700 via-blue-400 bg-[length:200%] rounded mt-5 py-2 px-8 transition-all duration-300">
                        <SendIcon /> Gửi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}