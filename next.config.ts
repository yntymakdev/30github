/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io'], // Разрешаем загрузку изображений с utfs.io
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
                pathname: '/f/**',
            },
        ],
    },
};

module.exports = nextConfig;
