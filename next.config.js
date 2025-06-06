/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Rimuovi swcMinify da qui
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Sposta outputFileTracingRoot fuori da experimental
  outputFileTracingRoot: __dirname,
  experimental: {
    // Mantieni solo le opzioni sperimentali valide
    esmExternals: 'loose',
  },
  output: "standalone"
  // Rimuovi distDir se causa problemi
}

module.exports = nextConfig
