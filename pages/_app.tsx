import type {AppProps} from 'next/app'
import {Context} from '../hooks/useGetPosts'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Context>
      <Component {...pageProps} />
      <ToastContainer />
    </Context>
  )
}

export default MyApp
