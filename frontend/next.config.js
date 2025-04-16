/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://amaans-domain.onrender.com/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig 