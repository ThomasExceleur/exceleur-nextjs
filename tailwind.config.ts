import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CB6AED',
          light: '#CA6AED',
          hover: '#B55DD4',
        },
        secondary: {
          DEFAULT: '#5048DD',
          hover: '#4640C7',
        },
        accent: '#7CC3EE',
        text: {
          DEFAULT: '#333333',
          dark: '#100F0D',
          light: '#69727D',
        },
        background: {
          DEFAULT: '#FFFFFF',
          alt: 'rgba(203, 106, 237, 0.12)',
          muted: 'rgba(0, 0, 0, 0.05)',
        },
        'footer-link': '#CC3366',
        success: '#008000',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Clear Sans', 'sans-serif'],
        display: ['Arapix', 'sans-serif'],
      },
      fontSize: {
        h1: ['43.2px', { lineHeight: '64.8px', fontWeight: '800' }],
        h2: ['32px', { lineHeight: '41.6px', fontWeight: '800' }],
        h3: ['19.2px', { lineHeight: '1.4', fontWeight: '800' }],
        'h3-card': ['20.8px', { lineHeight: '1.4', fontWeight: '800' }],
        body: ['17.6px', { lineHeight: '26.4px', fontWeight: '400' }],
        nav: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        small: ['14.4px', { lineHeight: '1.5', fontWeight: '400' }],
        'footer-heading': ['16px', { lineHeight: '1.5', fontWeight: '800' }],
        'read-more': ['14.4px', { lineHeight: '1.5', fontWeight: '800' }],
      },
      borderRadius: {
        button: '100px',
        card: '20px',
        input: '6px',
      },
      spacing: {
        'section-y': '80px',
        'section-y-lg': '96px',
        'card-padding': '48px',
        header: '101px',
      },
      maxWidth: {
        container: '1140px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to bottom, #CB6AED, #7CC3EE)',
        'gradient-hero': 'linear-gradient(270deg, #CB6AED 0%, #7CC3EE 100%)',
        'gradient-footer': 'linear-gradient(to bottom, #7CC3EE 0%, #FFFFFF 87%)',
        'gradient-section': 'linear-gradient(to bottom, #FFFFFF 0%, #CB6AED 100%)',
      },
      boxShadow: {
        card: 'none',
      },
      height: {
        header: '101px',
      },
    },
  },
  plugins: [],
};

export default config;
