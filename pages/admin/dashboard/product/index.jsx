import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardSideBar from '../../../../components/DashboardSideBar';
import { WhiteLayout } from '../../../../components/Layout';
import { GetAllProduct } from '../../../../Utils/FetchAPI/Product';
import serverAdminAuth from '../../../../Utils/AdminTool/ServerAdminAuth';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import currencyFormatter from "currency-formatter"
import Link from 'next/link';
import { GetAllGenre } from '../../../../Utils/FetchAPI/Genre';

export async function getServerSideProps(context) {
    if(serverAdminAuth(context)){
        return{
            props: { }
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

export default function DashboardProduct() {
    const [product, setProduct] = useState([])

    useEffect(()=>{
        const initData = async () => {
            const data = await GetAllProduct()
            setProduct(data)
        }

        initData()
    },[])

    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: 'rgb(59 130 246)',
          color: 'white'
        },
        '& .MuiDataGrid-columnHeaders *':{
          color: 'white'
        },
        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-columnHeader--moving':{
            backgroundColor: 'transparent'
        }
      }));

    const columns = [
        { field: 'product_id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Tên', width: 330 },
        { field: 'genres', headerName: 'Thể loại', width: 130, valueGetter: (params) =>{
            let str = ''
            params.row.genres && params.row.genres.forEach((i,index) => {
                index !== 0 ? str += ', ' + i.description : str += i.description
            })
            return str
        }},
        {
          field: 'platforms',
          headerName: 'Nền tảng',
          width: 160,
          valueGetter: (params) =>
            `${params.row.platforms.windows ? 'Windows' : ''}${params.row.platforms.mac ? ', Mac' : ''}`,
        },
        {
            field: 'price',
            headerName: 'Giá',
            width: 90,
            valueGetter: (params) => currencyFormatter.format(params.row.price / 100, { code: "VND" })
        },
        {
            field: 'release_date',
            headerName: 'Ngày phát hành',
            width: 190,
            valueGetter: (params) => params.row.release_date.coming_soon ? 'Chưa phát hành' : params.row.release_date.date
        },
        {
            field: '',
            headerName: 'Sửa',
            width: 200,
            renderCell: (params) => <Link href={`product/${params.row.product_id}`}><Button>Xem chi tiết</Button></Link>
        }
      ];

    return(
        <div className='flex'>
            <DashboardSideBar/>
            <section className="basis-4/5 py-16 px-10 min-h-screen">
                <h3 className="font-semibold text-3xl leading-10">Sản phẩm</h3>
                <div className='mt-12'>
                    <Link href={'product/new'}>
                        <Button variant="contained" className="shadow-none border-none hover:border-none ml-auto hover:bg-left bg-right text-white bg-blue-500 rounded mb-5 py-2 px-5"><AddIcon/>Tạo mới</Button>
                    </Link>

                    <StyledDataGrid
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        getRowId={(row) => row.product_id}
                        rows={product}
                        columns={columns}
                        pageSize={product.length}
                        rowsPerPageOptions={[product.length]}
                        disableSelectionOnClick
                        className='bg-white shadow-lg'
                        style={{ height: 400, width: '100%' }}
                    />
                </div>
            </section>
        </div>
    )
}

DashboardProduct.Layout = WhiteLayout