import '../styles/globals.css'
import '../styles/animation.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  // // getTheme();
  
  // function getTheme(){
  //   const theme = getCookie('theme');
  //   if(theme == ("theme=light" || undefined)){
  //     document.documentElement.setAttribute('theme', 'light')
  //   }else 
  //     document.documentElement.setAttribute('theme', 'dark')
  // }
  // function getCookie(cookieName: string): string{
  //   const cookie = document.cookie.split(";").find((item) => item.trim().startsWith(cookieName))?.split("=")[1];
  //   if (cookie != undefined){
  //     return cookie.toString();
  //   }else return "not found";
  // }
  useEffect(()=>{
    console.log(document.body.getAttribute('theme'))
    if(document.body.getAttribute('theme') == "undefined"){
      console.log('theme light')
      document.body.setAttribute('theme', "light");
    }
  },[])
  return <Component {...pageProps} />
}

export default MyApp
