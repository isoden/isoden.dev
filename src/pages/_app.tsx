import { AppProps } from 'next/app'
import 'prismjs/themes/prism.css'
import './_app.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
