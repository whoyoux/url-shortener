/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
        ppr: true,
    },
    images: {
        domains: ["cdn.discordapp.com"],
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
