/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/", // Only redirect root
        destination: "/faq",
        permanent: true, // Only if it's a permanent redirect
      },
    ];
  },
};

export default nextConfig;
