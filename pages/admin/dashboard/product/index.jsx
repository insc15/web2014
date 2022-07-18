import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardSideBar from '../../../../components/DashboardSideBar';
import { WhiteLayout } from '../../../../components/Layout';
import { GetAllProduct } from '../../../../Utils/FetchAPI/Product';
import serverAdminAuth from '../../../../Utils/AdminTool/serverAdminAuth';
import { Button } from '@mui/material';

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
        border: 0,
        color:
          theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
          }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
          }`,
        },
        '& .MuiDataGrid-cell': {
          color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
        ...customCheckbox(theme),
      }));

    const columns = [
        { field: 'steam_appid', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Tên', width: 330 },
        { field: 'genres', headerName: 'Last name', width: 130, valueGetter: (params) =>{
            let str = ''
            params.row.genres && params.row.genres.forEach((i,index) => {
                index !== 0 ? str += ', ' + i.description : str += i.description
            })
            return str
        }},
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'platforms',
          headerName: 'Platform(s)',
          width: 160,
          valueGetter: (params) =>
            `${params.row.platforms.windows ? 'Windows' : ''} ${params.row.platforms.mac ? ',Mac' : ''}`,
        },
      ];

    return(
        <div className='flex'>
            <DashboardSideBar/>
            <section className="basis-4/5 py-16 px-10 h-screen">
                <h3 className="font-semibold text-3xl leading-10">Product</h3>
                <div className='mt-16' style={{ height: 400, width: '100%' }}>
                    <Button variant="contained" className="border-none hover:border-none ml-auto hover:bg-left bg-right text-white bg-gradient-to-r from-blue-500 to-blue-700 via-blue-400 bg-[length:200%] rounded mt-5 py-2 px-5 transition-all duration-300">Tạo mới</Button>

                    <DataGrid
                        getRowId={(row) => row.product_id}
                        rows={product}
                        columns={columns}
                        pageSize={product.length}
                        rowsPerPageOptions={[product.length]}
                        checkboxSelection
                        className='shadow-xl'
                    />
                </div>
            </section>
        </div>
    )
}

DashboardProduct.Layout = WhiteLayout