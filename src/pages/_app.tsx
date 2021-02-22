import { AppProps } from 'next/app'
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
// import '../../public/styles/global.css'
import '../index.tailwind.css'
import 'prismjs/themes/prism.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}