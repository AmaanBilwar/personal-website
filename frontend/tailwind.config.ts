import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#000',
            h1: {
              color: '#000',
              fontSize: '2.25em',
              fontWeight: '800',
              marginBottom: '0.8em',
            },
            h2: {
              color: '#000',
              fontSize: '1.875em',
              fontWeight: '700',
              marginBottom: '0.5em',
            },
            h3: {
              color: '#000',
              fontSize: '1.5em',
              fontWeight: '600',
              marginBottom: '0.5em',
            },
          },
        },
        invert: {
          css: {
            color: '#fff',
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#fff',
            },
            h3: {
              color: '#fff',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#fff',
              '&:hover': {
                color: '#fff',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 