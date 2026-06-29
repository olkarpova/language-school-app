import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
