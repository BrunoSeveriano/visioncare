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
    API_URL:
      "https://homologacao.suporteaopaciente.com.br/visioncareapiexterno",
  },
};

module.exports = nextConfig;
