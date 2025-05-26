/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
 colors: {
        primary: '#FF7700',
        palered: '#FF876C',
        disabled: '#626262',
        lightgray:'#B1B1B1',
        darkText: '#000000',
        lightText: '#FFFFFF',
      },
       fontFamily: {
        sans: ['Poppins-Regular', 'sans-serif'], // Default sans-serif font
        poppins: ['Poppins-Regular', 'sans-serif'], // Custom name
        'poppins-regular': ['Poppins-Regular', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
        // Add other weights and styles as needed
      },
    },
  },
  plugins: [],
}
