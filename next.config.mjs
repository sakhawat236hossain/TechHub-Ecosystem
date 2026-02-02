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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', 
      },
        ],
      },
};

export default nextConfig;
