/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},

	reactStrictMode: true,
	images: {
		domains: [
			"images.unsplash.com",
			"cdn.sanity.io",
			"lh3.googleusercontent.com",
		],
	},
};

module.exports = nextConfig;
