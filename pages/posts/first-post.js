import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
export default function FirstPost() {
	return (
		<Layout>
			{' '}
			{/* Adding metadata using Head
            https://nextjs.org/docs/api-reference/next/head */}
			<Head>
				<title>First Post</title>
			</Head>
			<h1>First Post</h1>
			<h2>
				<Link href="/">
					<a>Back to home</a>
				</Link>
			</h2>
		</Layout>
	)
}
// in a production build *Link* will automatically prefetch the code for the linked page
// when the *Link* component appears in the browsers viewport.. like gatsby

// creating a different page.. much like gatsby..export must be default
// e.g. pages/posts/first-post.js is associated with the /posts/first-post route.

// client side navigation uses javascript to
// do page transitions which is faster than the default navigation done by the browser...

// next also does *code splitting*.. meaning that each page only loads what's necessary for that page.
// i.e. pay for what you visit
