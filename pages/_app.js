import { DefaultLayout } from '../components/Layout'
import '../styles/globals.scss'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useDetectAdBlock } from "adblock-detect-react";
import { Provider } from 'react-redux'
import { createWrapper } from "next-redux-wrapper";
import store from '../redux/store'
import NextProgress from "next-progress";
import DialogModal from '../components/DialogModal'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/action'
import Router from 'next/router'
import { Login } from '../Utils/FetchAPI/Account'
import * as base64 from 'base-64'
import { StyledEngineProvider } from '@mui/material/styles';


function StoreApp({ Component, pageProps }) {
  const dispatcher = useDispatch()
  const Layout = Component.Layout || DefaultLayout

  const router = useRouter()
  const adBlockDetected = useDetectAdBlock();
  const art = `                           _
                         _ooOoo_
                        o8888888o
                        88" . "88
                        (| -_- |)
                        O\\  =  /O
                     ____/\`---'\\____
                   .'  \\\\|     |//  \`.
                  /  \\\\|||  :  |||//  \\
                 /  _||||| -:- |||||_  \\
                 |   | \\\\\\  -  /'| |   |
                 | \\\_|  \`\\\`---'//  |_/ |
                 \\  .-\\__ \`-. -'__/-.  /
                ___\`. .'  /--.--\\  \`. .'___
             ."" '<  \`.___\\_<|>_/___.' _> \\"".
            | | :  \`- \\\`. ;\`. _/; .'/ /  .' ; |
            \\  \\ \`-.   \\_\\_\`. _.'_/_/  -' _.' /
  ===========\`-.\`___\`-.__\\ \\___  /__.-'_.'_.-'===========
                          \`=--=-'`
  // const [adBlockState, setAdBlockState] = useState(false)

  useEffect(() => {
    // if (adBlockDetected) {
    //   setAdBlockState(true)
    // }
    console.clear()
    console.log(`%c ${art}`, 'font-weight: bold; color: #3b82f6;')
    console.log('%cBug Defender!', 'font-weight: bold; font-size: 50px;color: red; padding: 1% 0');
    console.log('Author: %chttps://www.facebook.com/insc15','font-weight: bold; color: #3b82f6;')

    const authUser = async() => {
      if(Cookies.get('lg')){
        const userDataObj = JSON.parse(base64.decode(Cookies.get('lg')))

        const response = await Login(userDataObj.username, base64.decode(userDataObj.password))
        if(response.status === "success"){
          Cookies.set('lg',response.message)
          dispatcher(userLogin('SET',Cookies.get('lg')))
        }else{
          dispatcher(userLogin('REMOVE',Cookies.get('lg')))
          Cookies.remove('lg')
        }
      }
    }

    authUser()

  }, []);

  useEffect(() => {    
    const handleRouteChange = (url) => {
      // gtag.pageview(url)
      // setLoading(false)
      // console.log(loading)
    }

    // const startRouteChange = () => {
    //   setLoading(true)
    //   console.log(loading)
    // }
    // router.events.on("routeChangeStart", startRouteChange)
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      // router.events.on("routeChangeStart",startRouteChange)
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Provider store={store}>
      {
        adBlockDetected && <DialogModal isOpen={adBlockDetected}/>
      }
      <NextProgress/>
      <Layout>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-4BW5RZWZP8`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4BW5RZWZP8', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <NextSeo
          title="Trang chủ"
          type="website"
          titleTemplate='%s | Welgames'
          defaultOpenGraphImageHeight={630}
          defaultOpenGraphImageWidth={1200}
          description="Shop game bản quyền lớn và uy tín nhất Việt Nam. Bán game bản quyền giá rẻ, uy tín, nhanh chóng."
          openGraph={{
            url: 'https://welgames.vercel.app/',
            title: 'Welgames - Game bản quyền',
            description: 'Shop game bản quyền lớn và uy tín nhất Việt Nam. Bán game bản quyền giá rẻ, uy tín, nhanh chóng.',
            images: [
              {
                url: 'https://welgames.vercel.app/assets/banner.png',
                type: 'image/png',
              },
            ],
            site_name: 'Welgames',
            type: 'website'
          }}
          additionalMetaTags={
            [
              {
                property: 'content-language',
                content: 'en'
              },
              {
                property:'updated_time',
                content: '1652814682'
              },
              {
                property: 'keywords',
                content: 'game,Welgames,game bản quyền,Shop game bản quyền,mua game,mua game steam gia re,game ban quyen gia re'
              }
            ]
          }
          update
        />
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </Layout>
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(StoreApp) 
