// `pages/_app.js`
import '../styles/global.css';
import "../styles/typography.css";

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}