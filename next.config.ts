/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Questa opzione è fondamentale: ignora gli errori di TypeScript durante la build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora anche gli errori di ESLint
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
