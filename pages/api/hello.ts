import { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ text: 'Hello' })
}
// API route .. server side only and not included in the JS bundle for clients/browsers...
// we can implement our entire api in this way. API routes also support middlewares.

/*
Do Not Fetch an API Route from *getStaticProps* or *getStaticPaths*:
	- This is because both *getStaticProps* and *getStaticPaths* run only on the server side.
	So it is safe to include database queries and etc.. within them.So, there is no need to use an API route
	in this case.

	- A good use case handling form input:
		- The frontend code can send a "post" request to our route which can then query the database and etc...

	- There are also dynamic API routes:
		- https://nextjs.org/docs/api-routes/dynamic-api-routes
*/
