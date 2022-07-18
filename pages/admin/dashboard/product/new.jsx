import serverAdminAuth from "../../../../Utils/AdminTool/serverAdminAuth"

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
    return(
        <p>abc</p>
    )
}