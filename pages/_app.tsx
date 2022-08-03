import type {AppProps} from 'next/app'
import {Context} from '../hooks/useGetPosts'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  )
}

export default MyApp
