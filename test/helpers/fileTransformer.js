// See https://facebook.github.io/jest/docs/en/webpack.html
const path = require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
