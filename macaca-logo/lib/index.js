'use strict';

const fs = require('fs');
const path = require('path');

exports.print = function() {
  const ascii = fs.readFileSync(path.join(__dirname, 'ascii.js'), 'utf8');
  console.log(ascii);
};
