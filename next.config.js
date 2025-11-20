/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",          // when someone visits homepage
        destination: "/github", // send them to /github
        permanent: false,     // or true if you want SEO to treat it as fixed
      },
    ];
  },
};

module.exports = nextConfig;
