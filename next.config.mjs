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
      {
        protocol: "https",
        hostname: "vouawsbucket.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
