/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.divineshop.vn',"cdn.akamai.steamstatic.com","images5.alphacoders.com","genk.mediacdn.vn","2178994764-files.gitbook.io","www.littledayout.com","mllgp0xvon7y.i.optimole.com","image.thanhnien.vn","photo2.tinhte.vn","vtcpay.vn","technews.com.vn"],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    scrollRestoration: true,
  }
}

module.exports = nextConfig
