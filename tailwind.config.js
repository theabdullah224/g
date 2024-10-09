/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {

      colors: {
        // Add your custom colors here
        'P-Green1': '#738065',
        'P-Green2': '#A6AE9D',
        'S-Orange': '#F5A228',
        'Text1': '#313131',
        'Text2': '#606060',
        
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}