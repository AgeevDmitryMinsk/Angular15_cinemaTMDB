module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
  ],
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    }
  },
  variants: {
    lineClamp: ['responsive', 'hover']
  }
}
