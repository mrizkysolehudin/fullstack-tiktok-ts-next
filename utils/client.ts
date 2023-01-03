import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'bikeshop',
  apiVersion: '2022-03-10', // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
})

export default client