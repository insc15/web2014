import { cookiesParser } from "../CookiesParser";
import { Login } from "../FetchAPI/Account";
import * as base64 from 'base-64'

export default async function serverAdminAuth(context) {
    if(context.req.headers.cookie && cookiesParser(context.req.headers.cookie).lg) 
    {
        const cookies = cookiesParser(context.req.headers.cookie);
        const userDataObj = JSON.parse(base64.decode(cookies.lg))

        if(userDataObj.isAdmin == 1){
            const response = await Login(userDataObj.username, base64.decode(userDataObj.password))
            if(response.status !== "success"){
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }    

    return true
}