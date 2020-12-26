const { join } = require('path');

module.exports = {
  plugins: {

    'postcss-import':
      {
        root: join(__dirname, 'src/client'),
        path: ['styles'],
      },
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'custom-media-queries': true,
        'custom-properties': {
          appendVariables: false,
          preserve: false, // use true when will be fixed bug with duplicate root variables
        },
        'color-mod-function': true,
      },
    },
    cssnano:
      {
        zindex: false,
      },

  },
};
