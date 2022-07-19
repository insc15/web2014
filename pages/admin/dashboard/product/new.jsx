import { WhiteLayout } from "../../../../components/Layout"
import serverAdminAuth from "../../../../Utils/AdminTool/serverAdminAuth"
import DashboardSideBar from '../../../../components/DashboardSideBar';
import { TextField } from "@mui/material";
import RichTextEditor from "../../../../components/CKEditor";
import { useState } from "react";

export async function getServerSideProps(context) {
    if(serverAdminAuth(context)){
        return{
            props: {}
        }
    }else{
        return{
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }
}

export default function CreateNewProduct(params) {
    const [value, onChange] = useState('');

    return(
        <div className='flex'>
            <DashboardSideBar/>
            <section className="basis-4/5 py-16 px-10 min-h-screen">
                <h3 className="font-semibold text-3xl leading-10">Thêm mới sản phẩm</h3>
                <div className='mt-12 flex gap-10' style={{ height: 400, width: '100%' }}>
                    <div className="basis-2/3 bg-white rounded-xl shadow-lg p-10">
                        <TextField variant="standard" label='Tên sản phẩm'/> 
                        <RichTextEditor value={value} onChange={onChange}/>
                    </div>    
                    <div className="basis-1/3 bg-white rounded-xl shadow-lg"></div>
                </div>
            </section>
        </div>
    )
}

CreateNewProduct.Layout = WhiteLayout