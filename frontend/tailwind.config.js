/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // adjust to your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        primary: '#6C63FF', // soft purple
        secondary: '#FF6584', // pinkish
        accent: '#FFC75F', // warm yellow
        bg: '#F5F5F7', // light gray background
        card: '#FFFFFF', // card background
        textPrimary: '#1F1F1F', // dark text
        textSecondary: '#555555', // secondary text

        // Dark theme colors
        darkBg: '#1E1E2F', // dark background
        darkCard: '#2C2C3C', // dark card background
        darkPrimary: '#A78BFA', // soft purple for dark
        darkSecondary: '#FF94AA', // pinkish for dark
        darkAccent: '#FFD97D', // yellow for dark
        darkText: '#F5F5F7', // light text
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.08)',
        button: '0 5px 15px rgba(108, 99, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
