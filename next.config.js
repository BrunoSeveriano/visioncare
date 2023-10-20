/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "painelsite.viveo.com.br",
    ],

    unoptimized: true,
  },
  env: {
    API_URL: "https://takeda-api.viveo.com.br/",
  },
};

module.exports = nextConfig;
