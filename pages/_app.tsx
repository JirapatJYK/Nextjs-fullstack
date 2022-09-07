import '../styles/globals.css'
import '../styles/animation.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    if(document.body.getAttribute('theme') != "light" && document.body.getAttribute('theme') != "dark")
    {
      console.log('theme light')
      document.body.setAttribute('theme', "light");
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
