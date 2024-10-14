/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  swcMinify: true, // Better performance than Terser
  images: {
    domains: ["img.clerk.com", "utfs.io"],
  },
  async redirects() {
    return [{ source: "/", destination: "/home", permanent: true }];
  },
};

export default nextConfig;