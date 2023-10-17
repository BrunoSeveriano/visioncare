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
    API_URL:
      "http://homologacao.suporteaopaciente.com.br/api-takeda-visioncare-merge/",
  },
};

module.exports = nextConfig;
