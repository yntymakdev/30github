import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'null-loader',
        });
        return config;
    },
};

export default nextConfig;
