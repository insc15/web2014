import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import Link from 'next/link'
// import DiscountIcon from '@mui/icons-material/Discount';
import PhoneIcon from '@mui/icons-material/Phone';

export default function HeaderTopBar() {
  return (
    <div className="bg-blue-700 hidden lg:block">
      <div className='h-10 max-w-screen-xl mx-auto text-white flex justify-between align-middle xl:px-3 px-10'>
        <div className='h-fit my-auto'>Shop game bản quyền lớn và uy tín nhất Việt Nam</div>
        <div className='h-fit my-auto flex gap-5'>
          <Link href={"/about"}>
            <a className='hover:underline'>
              <InfoIcon/>
              <span className='ml-2'>Giới thiệu</span>
            </a>
          </Link>
          <Link href={"/help"}>
            <a className='hover:underline'>
              <BookIcon/>
              <span className='ml-2'>Hỗ trợ</span>
            </a>
          </Link>
          <Link href={"/contact"}>
            <a className='hover:underline'>
              <PhoneIcon/>
              <span className='ml-2'>Thông tin liên hệ</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
