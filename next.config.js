module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
          },
        ],
    },
    // Configure cache revalidation
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    // Disable webpack5 caching in development
    webpack: (config, { dev }) => {
        if (dev) {
            config.cache = false;
        }
        return config;
    }
}