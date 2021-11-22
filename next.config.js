module.exports = {
  publicRuntimeConfig: {
    site: {
      name: "Sole: Wage against your friends",
      url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://earvinpiamonte-nextjs-tailwindcss-template.vercel.app",
      title: "Sole: Wage against your friends",
      description: "Sole: Wage against your friends",
      socialPreview: "/images/preview.png",
    },
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};
