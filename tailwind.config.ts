import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4f46e5', hover: '#4338ca' },
        secondary: '#64748b'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;