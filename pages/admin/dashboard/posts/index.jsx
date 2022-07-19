import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DashboardSideBar from '../../../../components/DashboardSideBar';
import { WhiteLayout } from '../../../../components/Layout';
import { GetAllProduct } from '../../../../Utils/FetchAPI/Product';
import serverAdminAuth from '../../../../Utils/AdminTool/ServerAdminAuth';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

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
      }));

    const columns = [
        { field: 'product_id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: 'Tên', width: 330 },
        { field: 'genres', headerName: 'Genre', width: 130, valueGetter: (params) =>{
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
            <section className="basis-4/5 py-16 px-10 min-h-screen">
                <h3 className="font-semibold text-3xl leading-10">Product</h3>
                <div className='mt-12' style={{ height: 400, width: '100%' }}>
                    <Button variant="contained" className="shadow-none border-none hover:border-none ml-auto hover:bg-left bg-right text-white bg-blue-500 rounded mb-5 py-2 px-5"><AddIcon/>Tạo mới</Button>

                    <StyledDataGrid
                        getRowId={(row) => row.product_id}
                        rows={product}
                        columns={columns}
                        pageSize={product.length}
                        rowsPerPageOptions={[product.length]}
                        checkboxSelection
                    />
                </div>
            </section>
        </div>
    )
}

DashboardProduct.Layout = WhiteLayout