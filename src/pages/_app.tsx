import '../styles/globals.css'
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux'
import { store } from '../network/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import PerfectErrorBoundary from '@/middlewares/ErrorBoundary';
import { Analytics }from '@vercel/analytics/react'
;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}




export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <PerfectErrorBoundary>
      <Provider store={store}>
        <ToastContainer toastStyle={{ border: '1px solid #635FC7' }} />
        <ThemeProvider attribute='class'>
          {getLayout(<Component {...pageProps} suppressFirstRenderError={true} />)}
          <Analytics />
        </ThemeProvider>
      </Provider>
    </PerfectErrorBoundary>
    </>
  )
}

