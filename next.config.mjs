/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
          },
          {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com', 
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', 
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
        ],
      },
};

export default nextConfig;
