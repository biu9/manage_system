module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'selected':"url('./static/Vector.svg')",
        'selected2':"url('./static/selected2.svg')",
        'name':"url('./static/name.svg')",
        'phone':"url('./static/phone.svg')",
        'residentId':"url('./static/residentId.svg')",
        'position':"url('./static/position.svg')",
        'remind':"url('./static/remind.svg')",
        'uploadSuccess':"url('./static/uploadSuccess.svg')",
        'redRemind':"url('./static/redRemind.svg')",
       }
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'],
    },
  },
  plugins: [],
}
