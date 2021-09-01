import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
export default function Home({ allPostsData }) {
	// A page is a react component exported from a file in the "pages" directory, "Home" in this case
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>Just a programming enthusiast from Iran</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	)
}
// pre-rendering with data
export async function getStaticProps() {
	const allPostsData = getSortedPostsData()
	return {
		props: {
			allPostsData, // Passed to Home as a prop
		},
	}
}
// By default next.js pre-renders every page. This means that Next.js generates
// HTML for each page in advance

// Each HTML is associated with minimal JS code necessary for that page.
// When a page is laoded by the browser, its js code runs and makes the page
// fully interactive (this is called hydration)

// we can test prerendering by disabling JS in the browser and then refreshing..
// with normal react apps, nothing would be rendered but with next... our website would still render

/* 
There are 2 forms of pre-rendering:
	static generation: 
		- HTML is generated at build time. The pre-rendered HTML is then reused
		on each request

	Server side rendering:
		- Generates HTML on each request

Per-page basis:
	- We can choose which pre-rendering form to use for each page

When to use SG vs SSR:
	- If a page could be pre-rendered ahead of a user's request then choose SG. Prefer the use of SG wherever possible

	- If a page shows frequently updated data, and the page content changes on every request use SSR
	It will be slower, but that's the price you pay! 
*/

/*
Static generation with and without data:
	- Pages that don't require external data will automatically be statically generated when 
	the app is built for production

	- However, for some pages, we might need to first fetch some external data
	in order to be able to render the HTML. 

	SG with Data using "getStaticProps":
		- When exporting a page component we can also export an async function called
		*getStaticProps*. This function runs at build time in production and inside it we can
		fetch any external data and send it as props to the page

		- This essentially tells next.js that this page has some data dependencies - so when 
		you pre-render this page at build time, make sure to resolve them first

		- getStaticProps only runs on the server-side. It will never run on the 
		client side. It won't even be included in the JS bundler for the browser.
		This means that we can write code such as direct database queries without the 
		being sent to browsers.

		- Productions vs development:
			- In production *getStaticProps* runs at build time, but this behavior can be
			enhanced by using the `fallback` key returned by *getStaticPaths*

			- In development, *getStaticProps* runs on every request.
	
	 	- *getStaticProps* can only be exported from a page
*/
