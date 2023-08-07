/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output: "export",
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "painelsite.viveo.com.br",
    ],

    // unoptimized: true,
  },
  env: {
    API_URL: "http://10.96.10.61:8035",
  },
};

module.exports = nextConfig;
