module.exports = {
  content: ["./node_modules/flowbite/**/*.js", "./src/**/*.{html,js}" ],
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      animation: {
        wiggle: 'wiggle 5s ease-in-out infinite',
      }
    }
  },
  variants: {
    lineClamp: ['responsive', 'hover']
  }
}
