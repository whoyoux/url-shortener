/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
        ppr: true,
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
