// import App from "next/app";
import type {AppProps} from 'next/app'
import 'antd/dist/antd.css'
import '../styles/globals.scss'
import {Provider} from 'react-redux'
import {store} from '../store/store'

function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp