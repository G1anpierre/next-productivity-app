import type {AppProps} from 'next/app'
import {Context} from '../hooks/useGetPosts'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useState} from 'react'

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Context>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </Context>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
