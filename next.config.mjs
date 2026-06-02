/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — produces a fully static site in `out/` that Netlify serves
  // directly. No serverless runtime needed for v1 (data is resolved at build time).
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
