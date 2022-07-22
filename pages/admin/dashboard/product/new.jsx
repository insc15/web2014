import { WhiteLayout } from "../../../../components/Layout"
import serverAdminAuth from "../../../../Utils/AdminTool/ServerAdminAuth"
import DashboardSideBar from '../../../../components/DashboardSideBar';
import { TextField } from "@mui/material";
import Editor from "../../../../components/CKEditor";
import Checkbox from '@mui/material/Checkbox';
import { GetAllGenre } from "../../../../Utils/FetchAPI/Genre";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export async function getServerSideProps(context) {
    if(serverAdminAuth(context)){
        const genreList = await GetAllGenre()
        return{
            props: { genreList: genreList }
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

export default function CreateNewProduct({genreList}) {
    return(
        <div className='flex'>
            <DashboardSideBar/>
            <section className="basis-4/5 py-16 px-10 min-h-screen">
                <h3 className="font-semibold text-3xl leading-10">Thêm mới sản phẩm</h3>
                <div className='mt-12 flex gap-10'>
                    <div className="basis-2/3 bg-white rounded-xl shadow-lg p-10">
                        <p>Tên sản phẩm</p>
                        <TextField variant="standard"/> 
                        <p>Mô tả sản phẩm</p>
                        <Editor height={500}/>
                    </div>    
                    <div className="p-5 basis-1/3 bg-white rounded-xl shadow-lg">
                        <div className="p-5">
                            <p className="text-xl">Danh mục</p>
                            <FormGroup className="bg-gray-100 px-5 py-2 my-5 max-h-48 overflow-y-auto">
                            {
                                genreList.map((e,i)=>{
                                    return (
                                        <FormControlLabel key={i} control={<Checkbox defaultChecked={i===0} />} label={e.description} />
                                    )
                                })
                            }
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

CreateNewProduct.Layout = WhiteLayout