"use strict";

var _postcss = _interopRequireDefault(require("postcss"));

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _resolveConfig = _interopRequireDefault(require("./utils/resolveConfig"));

var _constants = require("./constants");

var _processTigerRia = _interopRequireDefault(require("./processTigerRia"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveConfigPath(filePath) {
  // require('postcss-tiger-ria')({ theme: ..., variants: ... })
  if (_lodash.default.isObject(filePath) && !_lodash.default.has(filePath, 'config') && !_lodash.default.isEmpty(filePath)) {
    return undefined;
  } // require('postcss-tiger-ria')({ config: 'custom-config.js' })


  if (_lodash.default.isObject(filePath) && _lodash.default.has(filePath, 'config') && _lodash.default.isString(filePath.config)) {
    return _path.default.resolve(filePath.config);
  } // require('postcss-tiger-ria')({ config: { theme: ..., variants: ... } })


  if (_lodash.default.isObject(filePath) && _lodash.default.has(filePath, 'config') && _lodash.default.isObject(filePath.config)) {
    return undefined;
  } // require('postcss-tiger-ria')('custom-config.js')


  if (_lodash.default.isString(filePath)) {
    return _path.default.resolve(filePath);
  } // require('postcss-tiger-ria')


  try {
    const configPath = _path.default.resolve(_constants.defaultConfigPath);

    _fs.default.accessSync(configPath);

    return configPath;
  } catch (err) {
    return undefined;
  }
}

function getConfigFunction(configPath) {
  return function getConfig() {
    if (_lodash.default.isUndefined(configPath)) {
      return (0, _resolveConfig.default)([_constants.defaultConfig]);
    }

    const config = require(configPath);

    return (0, _resolveConfig.default)([_constants.defaultConfig, config]);
  };
}

module.exports = _postcss.default.plugin('postcss-tiger-ria', config => {
  const configPath = resolveConfigPath(config);
  return (0, _postcss.default)([(0, _processTigerRia.default)(getConfigFunction(configPath))]);
});