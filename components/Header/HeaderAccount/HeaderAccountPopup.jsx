import { useSelector } from "react-redux"
import * as base64 from 'base-64'
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function HeaderAccountPopup() {
    const UserData = JSON.parse(base64.decode(useSelector(state => state.userLogin)))
    const router = useRouter()

    return(
        <>
            <div className="rounded p-2 bg-white shadow-xl text-black">
                { UserData.isAdmin == 1 && <Link href={'/admin/dashboard'}><a className="p-2 hover:bg-gray-200 w-full rounded-sm mb-1 flex"><AdminPanelSettingsIcon className="mr-2"/>Trang quản trị</a></Link> }
                <Link href={'/profile'}><a className="p-2 hover:bg-gray-200 w-full rounded-sm mb-1 flex"><PersonIcon className="mr-2"/>Tài khoản</a></Link>
                <a onClick={() => {Cookies.remove('lg');router.reload()}} className="p-2 hover:bg-gray-200 w-full rounded-sm cursor-pointer text-red-600 font-bold flex"><LoginIcon className="mr-2"/>Đăng xuất</a>
            </div>
        </>
    )
}