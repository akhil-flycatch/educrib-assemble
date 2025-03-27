const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

// const allowedDomains = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS
//   ? process.env.NEXT_PUBLIC_ALLOWED_DOMAINS.split(",")
//   : [];

module.exports = {
  webpack: (config: { plugins: any[] }, { isServer }: any) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  images: {
    // domains: [...allowedDomains]
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
