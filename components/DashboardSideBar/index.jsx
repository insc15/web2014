import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import { useRouter } from 'next/router';

export default function DashboardSideBar() {
    const router = useRouter()

    const tabs = [
        {
            name: 'Sản phẩm',
            icon: Inventory2RoundedIcon,
            slug: 'product'
        },
        {
            name: 'Bài viết',
            icon: NewspaperRoundedIcon,
            slug: 'posts'
        },
        {
            name: 'Người dùng',
            icon: GroupRoundedIcon,
            slug: 'users'
        }
    ]

    return(
        <aside className="basis-1/5 bg-white shadow-xl">
            <div className="fixed top-0 bottom-0 py-16 px-14 w-1/5">
                <h1 className="font-bold text-4xl text-blue-500 px-5">Dashboard</h1>
                <ul className="my-16">
                    {
                        tabs.map((e,i)=>{
                            return(
                                <li key={i} onClick={()=> { router.replace(`/admin/dashboard/${e.slug}`) }} className={`${router.pathname.includes(e.slug) && 'bg-blue-500 text-white'} py-3 px-7 flex gap-5 mt-2 font-semibold items-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer rounded-xl`}>
                                    <e.icon/>
                                    <p>{e.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}