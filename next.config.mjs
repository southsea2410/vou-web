/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["glass-js/swc", {}]],
  },
};

export default nextConfig;
