/* ================================================================
 * macaca-logo by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Mar 17 2015 00:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const fs = require('fs');
const path = require('path');

exports.print = function() {
  const ascii = fs.readFileSync(path.join(__dirname, 'ascii.js'), 'utf8');
  console.log(ascii);
};
