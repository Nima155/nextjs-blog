import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { AppProps } from 'next/app'
// dynamic routing using [whatever key]
export default function Post({
	postData,
}: {
	postData: {
		title: string
		date: string
		contentHtml: string
	}
}) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
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

export async function getStaticPaths() {
	// returns an array of possible values for [id].. this array gets passed to getStaticProps
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id) // get the post associated with a given id
	return {
		props: {
			postData, // pass the post information to Post
		},
	}
}
/*
Development vs Production:
    - In development *getStaticPaths* runs on every request

    - In production *getStaticPaths* runs at build time.

Fallback:
    fallback: false

        - any paths not returned by *getStaticPaths* will result in a 404 page

    fallback: true

        - The paths that have not been generate at build time will not reuslt 
        in a 404 page. Instead next.js will serve a *fallback* version of the page
        on the first request to such a path.

        - Subsequent requests to same path will serve the same generated page.
    
    fallback: "blocking"

        - new paths will be server side rendered with *getStaticProps* and cached for 
        future requests so it only happens once per path.

catch-all Routes:
    - Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets
    - "pages/posts/[...id].js" will match "posts/a/", and "/posts/a/b/c" and so on...

    - If we do this, in *getStaticPaths*, we must return an array as the value of the "id" key like so:
        - return [
            {
                params: {
                // Statically Generates /posts/a/b/c
                id: ['a', 'b', 'c']
                }
            }
            //...
            ]

Router:
    - we can gain access to the Next.js router by importing the *useRouter* hook from "next/router"

404 Pages:
    - we can create a *pages/404.js* and implement our 404 component in there, which will then be 
    statically generated at build time.
*/
