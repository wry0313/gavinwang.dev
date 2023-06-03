/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.mp3$/,
            type: 'asset/resource',
            use: {
                loader: 'file-loader',
            },
        });

        return config;
    }
};

module.exports = nextConfig;