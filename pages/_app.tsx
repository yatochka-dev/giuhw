import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Header} from "@/components/layout/header/Header";
import {SEO} from "@/components/layout/SEO/SEO";
import {Ad} from "@/components/layout/Ad/Ad";

function App({Component, pageProps}: AppProps) {
    return (
        <>
            <SEO/>
            <div className={"app"}>
                <Header/>
                <div className={"container"}>
                    <Ad/>
                    <Component {...pageProps} />
                    <Ad/>
                </div>

            </div>
        </>
    )
}

export default App
