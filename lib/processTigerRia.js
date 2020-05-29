"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

// import postcss from 'postcss';
// import _ from 'lodash';
// import fs from 'fs';
// import path from 'path';
function _default(getConfig) {
  return function processor() {
    console.log(getConfig()); // fs.writeFile(path.resolve('/output.md'), getConfig());
    // const config = getConfig();
    // const processedPlugins = processPlugins([
    //     ...corePlugins(config),
    //     ...config.plugins],
    //     config
    // );
    // return postcss([
    // ]).process(css, { from: _.get(css, 'source.input.file') });
    // return css;
  };
}