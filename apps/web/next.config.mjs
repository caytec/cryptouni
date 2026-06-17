/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pakiety źródłowe (TS) z monorepo transpilowane przez Next.
  transpilePackages: ["@cryptouni/content", "@cryptouni/core"],
};

export default nextConfig;
