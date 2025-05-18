/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          light: '#FF8B5E',
          dark: '#E55520',
          50: '#FFF0EB',
          100: '#FFE1D6',
          200: '#FFC3AD',
          300: '#FFA585',
          400: '#FF875C',
          500: '#FF6B35',
          600: '#E55520',
          700: '#CB4017',
          800: '#B03010',
          900: '#962009',
        },
        secondary: {
          DEFAULT: '#343A40',
          light: '#495057',
          dark: '#212529',
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#212529',
          900: '#0F1114',
        },
        accent: {
          DEFAULT: '#0A81D1',
          light: '#2498E8',
          dark: '#0769AC',
        },
        light: '#F8F9FA',
        dark: '#212529',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'lg-even': '0 0 15px -3px rgba(0, 0, 0, 0.1), 0 0 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      screens: {
        '2xl': '1536px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#343A40',
            a: {
              color: '#FF6B35',
              '&:hover': {
                color: '#E55520',
              },
            },
            h1: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
            },
            h2: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
            },
            h3: {
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
            },
          },
        },
      },
      height: {
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
} 