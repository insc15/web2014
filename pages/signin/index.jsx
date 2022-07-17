import LoginTemplate from "../../components/Templates/Login";
import { cookiesParser } from "../../Utils/CookiesParser";

export async function getServerSideProps(context) {
<<<<<<< HEAD
    console.log(context)
//     const cookies = cookiesParser(context.req.headers.cookie);
//     if(cookies.lg){
//         return{
//             redirect: {
//                 destination: '/',
//                 permanent: true,
//             }
//         }
//     }
=======
    if(context.req.headers.cookie) 
    {
        const cookies = cookiesParser(context.req.headers.cookie);
        if(cookies.lg){
            return{
                redirect: {
                    destination: '/',
                    permanent: true,
                }
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
    
>>>>>>> acf0d81 (fix error when cookies not found)

    return {
        props: {},
    };
  }


export default function Login() {
    return (
        <LoginTemplate/>
    )
}
