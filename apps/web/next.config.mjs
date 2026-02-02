import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  generateEtags: false,


  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /node_modules\/.*\/test\/.*\.(js|mjs)$/,
      type: "javascript/auto",
      use: "null-loader",
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@react-native-async-storage/async-storage": false,
      };
    }

    return config;
  },
};

export default nextConfig;
