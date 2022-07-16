import { WhiteLayout } from "../../components/Layout"
import { cookiesParser } from "../../Utils/CookiesParser";
import * as base64 from 'base-64'
import Login from "../signin";
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import DashboardProduct from "./product";
import { useState } from "react";

export async function getServerSideProps(context) {
    const redirect = () => {
        return{
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    const cookies = cookiesParser(context.req.headers.cookie);
    if(cookies.lg){
        const userDataObj = JSON.parse(base64.decode(cookies.lg))

        if(userDataObj.isAdmin == 1){
            const response = await Login(userDataObj.username, base64.decode(userDataObj.password))
            if(response.status !== "success"){
                redirect()
            }
        }else{
            redirect()
        }
        
    }else{
        redirect()
    }

    return {
        props: {},
    };
}

export default function Dashboard() {
    const tabs = [
        {
            component: DashboardProduct,
            name: 'Sản phẩm',
            icon: Inventory2RoundedIcon
        },
        {
            component: "edsf",
            name: 'Bài viết',
            icon: NewspaperRoundedIcon
        },
        {
            component: "edsf",
            name: 'Người dùng',
            icon: GroupRoundedIcon
        }
    ]
    const [currentTab, setTab] = useState(0)

    return(
        <div className="flex">
            <aside className="basis-1/5 bg-white">
                <div className="fixed top-0 bottom-0 py-16 px-14 w-1/5">
                    <h1 className="font-bold text-4xl text-blue-500 px-5">Dashboard</h1>
                    <ul className="my-16">
                        {
                            tabs.map((e,i)=>{
                                return(
                                    <li key={i} onClick={()=> setTab(i)} className="py-3 px-7 flex gap-5 mt-2 font-semibold items-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer rounded-xl">
                                        <e.icon/>
                                        <p>{e.name}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </aside>
            <section className="basis-4/5 py-16 px-10 h-screen">
                {
                    tabs.map((TabElement,i) => {
                        if(i === currentTab) return <TabElement.component/>
                    })
                }
            </section>
        </div>
    )
}

Dashboard.Layout = WhiteLayout