/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "",
        pathname: "/public",
      },
    ],
  },
  experimental: {
    swcPlugins: [["glass-js/swc", {}]],
  },
};

export default nextConfig;
