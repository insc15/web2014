import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { GetAllProduct } from '../../Utils/FetchAPI/Product';

export async function getServerSideProps(context) {
    return {
        notFound: true
    };
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
        <>
            <h3 className="font-semibold text-3xl leading-10">Product</h3>
            <div className='mt-16' style={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.product_id}
                    rows={product}
                    columns={columns}
                    pageSize={product.length}
                    rowsPerPageOptions={[product.length]}
                    checkboxSelection
                />
                </div>
        </>
    )
}