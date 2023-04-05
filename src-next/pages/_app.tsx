import { GlobalStyle } from "../styles/globals";
import { AppProps } from "next/dist/shared/lib/router/router";
import 'sweetalert2/src/sweetalert2.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}