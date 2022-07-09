const theme = require("@buildcities/base-ui.themes");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["build-core-components/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: theme.brandYellowPurple.colors,
    fontFamily: {
      extends: {
        sans: [
          theme.brandYellowPurple.fontFamily,
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
};


