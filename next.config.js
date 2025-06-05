/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Aggiungi questa sezione
    
    esmExternals: 'loose',
    outputFileTracingRoot: process.cwd(),
  }
}

module.exports = nextConfig
