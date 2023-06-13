module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
