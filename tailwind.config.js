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
       },
       boxShadow: {
          sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
          inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          none: 'none',
          std:'4px 4px 24px rgba(116, 100, 250, 0.32)'
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover'],
      boxShadow: ['active']
    },
  },
  plugins: [],
}
