// The *App* components is the top-level components which will be common across
// all the different pages. We can use this *App* component to keep state when navigating
// between pages.
import '../styles/global.css' // importing global css file
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />
}
// global CSS files are imported here.. and nowhere else
