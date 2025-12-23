const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "@base-org/account": false,
        "@coinbase/cdp-sdk": false,
      },
    },
  },
};

module.exports = nextConfig;
