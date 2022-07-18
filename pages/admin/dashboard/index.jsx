import { WhiteLayout } from "../../../components/Layout"
import serverAdminAuth from "../../../Utils/AdminTool/serverAdminAuth"

export async function getServerSideProps(context) {
    if(serverAdminAuth(context)){
        return{
            redirect: {
                destination: '/admin/dashboard/product',
                permanent: true,
            }
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

export default function Dashboard() {
    return(
       <></>
    )
}

Dashboard.Layout = WhiteLayout