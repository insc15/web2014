import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { cookiesParser } from '../../Utils/CookiesParser';
import * as base64 from 'base-64'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { ChangePassword, Login } from '../../Utils/FetchAPI/Account';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';

export async function getServerSideProps(context) {
    if(context.req.headers.cookie) 
    {
        const cookies = cookiesParser(context.req.headers.cookie);
        if(cookies.lg){
            const userDataObj = JSON.parse(base64.decode(cookies.lg))
            const response = await Login(userDataObj.username, base64.decode(userDataObj.password))
            if(response.status !== "success"){
                return{
                    redirect: {
                        destination: '/',
                        permanent: true,
                    }
                }
            }else{
                return {
                    props: {
                        userData:base64.decode(cookies.lg)
                    },
                };
            }
        }else{
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
  }

function Profile({userData}) {
    const { register, handleSubmit, reset, getValues, setError, clearErrors, formState: { errors } } = useForm()
    const userDataObj = JSON.parse(userData)
    const [isEmailVisible, setEmailVisible] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)

    useEffect(()=>{
        if(isSuccess){
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
        }
    },[isSuccess])

    String.prototype.replaceBetween = function(start, end, what) {
        let replaceStr = ''
        for (let index = 0; index < end; index++) {
            replaceStr += '*'
        }
        return this.substring(0, start) + replaceStr + this.substring(end);
    };

    const onSubmit = async(data) => {
        if(getValues('newPassword') === getValues('passwordChecker') && getValues('newPassword') !== getValues('oldPassword')){
            const result = await ChangePassword(userDataObj.user_id, userDataObj.username, data.oldPassword, data.newPassword)
            if(result.status === "success"){
                reset()
                setSuccess(true)
            }else if(result.status === 'failed'){
                setError('oldPassword',{message: result.message})
            }
        }else if(getValues('newPassword') === getValues('oldPassword')){
            setError('newPassword',{message: "Mật khẩu không được trùng với mật khẩu cũ"})
            setLoading(false)
        }else{
            setError('passwordChecker',{message: "Mật khẩu không khớp"})
            setLoading(false)
        }
    };

    return(
        <div className='max-w-screen-xl mx-auto lg:px-5'>
            <div className='px-5 lg:px-10 py-5 pb-10 lg:my-10 bg-white lg:rounded-xl lg:shadow-lg overflow-hidden'>
                <p className="my-7 text-blue-500 text-3xl font-semibold">Tài khoản</p>
                <div className="flex flex-wrap md:gap-0 gap-8">
                    <div className='basis-full md:basis-1/3 relative flex items-center flex-col'>
                        <Image src={userDataObj.avatar_path} width={'200px'} height={'200px'} layout={'fixed'} alt='avatar'/>
                        <Button className='w-fit mt-5' variant="outlined" component="label">Sửa ảnh đại diện
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                    </div>
                    <div className='basis-full md:basis-2/3 md:pl-10'>
                        <div className='flex flex-wrap'>
                            <p className='basis-1/2 pb-5 pr-5'>
                                <strong>Tên đăng nhập</strong>
                                <span className='block'>{userDataObj.username}</span>
                            </p>
                            <p className='basis-1/2 pb-5 pr-5'>
                                <strong>Vai trò</strong>
                                <span className='block'>{userDataObj.isAdmin == 1 ? "Quản trị viên" : "Thành viên"}</span>
                            </p>
                            <p className='basis-1/2 pb-5 pr-5'>
                                <strong>Email</strong>
                                <span className='flex items-center gap-3'>{isEmailVisible ? userDataObj.email : userDataObj.email.replaceBetween(0,userDataObj.email.indexOf("@"),"*")} <IconButton onClick={()=>{setEmailVisible(!isEmailVisible)}}>{isEmailVisible ? <VisibilityOffIcon/> : <VisibilityIcon/>}</IconButton> </span>
                            </p>
                        </div>
                        <p className='my-5 block font-bold'>Đổi mật khẩu</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
                            <div className='grid basis-full lg:basis-2/3 lg:pr-5 border-r border-gray-200'>
                                <TextField className='mb-4' error={errors.oldPassword && true} label="Mật khẩu cũ" inputProps={{style:{padding: "12.5px 14px"}}} InputLabelProps={{shrink: true,style: {fontSize: "1rem",color: errors.oldPassword ? "#d32f2f" : "#000"}}} helperText={errors.oldPassword?.message} variant="outlined" {...register("oldPassword",{required: "Phần này là bắt buộc"})}/>
                                
                                <TextField className='mb-4' error={errors.newPassword && true} label="Mật khẩu mới" inputProps={{style:{padding: "12.5px 14px"}}} InputLabelProps={{shrink: true,style: {fontSize: "1rem",color: errors.newPassword ? "#d32f2f" : "#000"}}} helperText={errors.newPassword?.message} variant="outlined" {...register("newPassword",{required: "Phần này là bắt buộc", pattern: {value:/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm, message:'Mật khẩu phải chứa ít nhất 8 kí tự, 1 chữ thường và 1 số.'}})}/>
                                
                                <TextField className='mb-4' error={errors.passwordChecker && true} label="Nhập lại mật khẩu mới" inputProps={{style:{padding: "12.5px 14px"}}} InputLabelProps={{shrink: true,style: {fontSize: "1rem",color: errors.passwordChecker ? "#d32f2f" : "#000"}}} helperText={errors.passwordChecker?.message} variant="outlined" {...register("passwordChecker",{required: "Phần này là bắt buộc"})}/>
                            </div>
                        
                            <div className='lg:pl-5 lg:basis-1/3 basis-full text-gray-500'>
                                <p>Mật khẩu phải chứa ít nhất 8 kí tự, 1 chữ thường và 1 số.</p>
                                <LoadingButton
                                    type='submit'
                                    onClick={()=> {clearErrors('globalError')}}
                                    loading={isLoading}
                                    loadingPosition="start"
                                    startIcon={<SaveIcon className='mr-px' />}
                                    variant="outlined"
                                    className="leading-[15px] border-none hover:border-none hover:bg-left bg-right text-white bg-gradient-to-r from-blue-500 to-blue-700 via-blue-400 bg-[length:200%] rounded mt-5 py-3 px-5 transition-all duration-300"
                                >
                                    Lưu
                                </LoadingButton>
                                <Grow in={isSuccess}><Alert variant="filled" severity="success" className='fixed bottom-10 right-10' onClose={() => {setSuccess(false)}}>Đổi mật khẩu thành công!</Alert></Grow>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile