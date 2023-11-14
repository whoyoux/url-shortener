/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
        ppr: true,
    },
};

module.exports = nextConfig;
