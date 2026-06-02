// PostCSS pipeline shared by Mantine and Tailwind v4.
// - postcss-preset-mantine: enables Mantine mixins (light-dark, rtl, etc.)
// - postcss-simple-vars: exposes Mantine breakpoint variables to CSS
// - @tailwindcss/postcss: Tailwind v4 engine
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
    '@tailwindcss/postcss': {},
  },
};
