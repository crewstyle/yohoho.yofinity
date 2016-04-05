module.exports = {
  src: {
    files: {
      //JS version including jQuery package
      './dist/yofinity.min.js': [
        './bower_components/jquery/dist/jquery.js',
        './src/yofinity.js'
      ],
      //JS version without jQuery package
      './dist/standalone/yofinity.min.js': [
        './src/yofinity.js'
      ],
    }
  },

  options: {
    preserveComments: 'some'
  }
};
