/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/faq",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
