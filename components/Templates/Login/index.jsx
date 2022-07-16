import Link from 'next/link';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Image from 'next/image';
import { useForm } from 'react-hook-form'
import { Login, Register } from '../../../Utils/FetchAPI/Account'
import { userLogin } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Router from 'next/router';

function LoginTemplate({signUp}) {
    const dispatcher = useDispatch()
    const { register, handleSubmit, reset, getValues, setError, clearErrors, trigger, formState: { errors } } = useForm()
    const [isSignUp, setSignUp] = useState(signUp)
    const [isLoading, setLoading] = useState(false)

    useEffect(()=>{
        setSignUp(signUp)
    },[signUp])

    const SignIn = async() => {
        setLoading(true)
        const result = await Login(getValues('username'),getValues('password'))
        if(result.status === "success"){
            if(getValues('remember')){
                Cookies.set('lg', result.message, { expires: 365 })
            }else{
                Cookies.set('lg', result.message, { expires: 1 })
            }
            dispatcher(userLogin("SET",result.message))
            Router.push('/')
        }else{
            setError('username')
            setError('password')
            setError('globalError',{message: result.message})
            setLoading(false)
        }
    }

    const SignUp = async() => {
        setLoading(true)
        if(getValues('password') === getValues('passwordChecker')){
            const result = await Register(getValues('email'),getValues('username'),getValues('password'))
            if(result.status === "success"){
                if(getValues('remember')){
                    Cookies.set('lg', result.message, { expires: 365 })
                }else{
                    Cookies.set('lg', result.message, { expires: 1 })
                }
                dispatcher(userLogin("SET",result.message))
                Router.push('/')
            }else if(result.status === "duplicate"){
                result.message.includes("Email") ? setError('email', {message: result.message}) : setError('username', {message: result.message})
                
                setLoading(false)
            }else{
                setError('username')
                setError('password')
                setError('globalError',{message: result.message})
                setLoading(false)
            }
        }else{
            setError('passwordChecker',{message: "Mật khẩu không khớp"})
            setLoading(false)
        }
    }

    return(
        <div className='max-w-screen-lg mx-auto px-5'>
            <div className='p-5 flex my-10 bg-white rounded-xl shadow-xl overflow-hidden'>
                <div className="basis-full lg:basis-1/2">
                    <p className="px-5 py-7 text-blue-500 text-3xl font-semibold">{ isSignUp ? "Đăng ký":"Đăng nhập" } <Link href={isSignUp ? "/signin":"/signup"}><a className='text-xl hover:underline text-gray-500 ml-2'>{isSignUp ? "Đăng nhập":"Đăng ký"}</a></Link></p>
                    <form className='grid p-5' onSubmit={handleSubmit(isSignUp ? SignUp : SignIn)}>
                        <TextField className='mb-8' error={errors.username && true} label="Tên đăng nhập" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: errors.username ? "#d32f2f" : "#000"}}} helperText={errors.username?.message} variant="standard" {...register("username", {required: "Phần này là bắt buộc"})}/>
                        
                        {
                            isSignUp ? 
                            <>
                                <TextField className='mb-8' error={errors.email && true} label="Email" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: errors.email ? "#d32f2f" : "#000"}}} helperText={errors.email?.message} variant="standard" {...register("email",{required: "Phần này là bắt buộc", pattern: {value:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message:'Email phải có định dạng example@yourdomain.com'}})}/>
                                <TextField className='mb-8' error={errors.password && true} label="Mật khẩu" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: errors.password ? "#d32f2f" : "#000"}}} helperText={errors.password ? errors.password.message : "Mật khẩu phải chứa ít nhất 8 kí tự, 1 chữ thường và 1 số."} variant="standard" {...register("password",{required: "Phần này là bắt buộc", pattern: {value:/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/gm, message:'Mật khẩu phải chứa ít nhất 8 kí tự, 1 chữ thường và 1 số.'}})}/>
                            </>
                            :
                            <TextField className='mb-8' error={errors.password && true} label="Mật khẩu" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: errors.password ? "#d32f2f" : "#000"}}} helperText={errors.password?.message} variant="standard" {...register("password",{required: "Phần này là bắt buộc"})}/>
                        }

                        { isSignUp && <TextField className='mb-8' error={errors.passwordChecker && true} label="Nhập lại mật khẩu" InputLabelProps={{shrink: true,style: {fontSize: "1.2rem",color: errors.passwordChecker ? "#d32f2f" : "#000"}}} helperText={errors.passwordChecker?.message} variant="standard" {...register("passwordChecker",{required: "Phần này là bắt buộc"})}/> }
                        
                        <p className='text-sm text-[#d32f2f]'>{errors.globalError?.message}</p>

                        <FormGroup>
                            <FormControlLabel className='w-fit' control={<Checkbox/>} label={"Lưu thông tin đăng nhập"} {...register("remember")}/>    
                        </FormGroup>           

                        <LoadingButton
                            type='submit'
                            onClick={()=> {clearErrors('globalError')}}
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<LoginIcon className='mr-3' />}
                            variant="outlined"
                            className="border-none hover:border-none ml-auto hover:bg-left bg-right text-white bg-gradient-to-r from-blue-500 to-blue-700 via-blue-400 bg-[length:200%] rounded mt-5 py-3 px-5 transition-all duration-300"
                        >
                            {isSignUp ? "Đăng ký":"Đăng nhập"}
                        </LoadingButton>
                    </form>
                </div>
                <div className='basis-1/2 hidden lg:block relative ml-5'>
                    <Image width={"100%"} height={"100%"} layout='fill' src={"/assets/bg-login.svg"} alt={''}></Image>
                </div>
            </div>
        </div>
    )
}

export default LoginTemplate