let postcss = require('postcss')

module.exports = postcss.plugin('postcss-tiger-ria', (opts = { }) => {

  // Work with options here

  return (root, result) => {

    // Transform CSS AST here

  }
})