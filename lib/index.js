"use strict";

var _postcss = _interopRequireDefault(require("postcss"));

var _lodash = _interopRequireDefault(require("lodash"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _registerConfigAsDependency = _interopRequireWildcard(require("./lib/registerConfigAsDependency"));

var _resolveConfig = _interopRequireDefault(require("./utils/resolveConfig"));

var _constants = require("./constants");

var _processAtomStar = _interopRequireDefault(require("./processAtomStar"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveConfigPath(filePath) {
  // require('postcss-atom-star')({ theme: ..., variants: ... })
  if (_lodash.default.isObject(filePath) && !_lodash.default.has(filePath, "config") && !_lodash.default.isEmpty(filePath)) {
    return undefined;
  } // require('postcss-atom-star')({ config: 'custom-config.js' })


  if (_lodash.default.isObject(filePath) && _lodash.default.has(filePath, "config") && _lodash.default.isString(filePath.config)) {
    return _path.default.resolve(filePath.config);
  } // require('postcss-atom-star')({ config: { theme: ..., variants: ... } })


  if (_lodash.default.isObject(filePath) && _lodash.default.has(filePath, "config") && _lodash.default.isObject(filePath.config)) {
    return undefined;
  } // require('postcss-atom-star')('custom-config.js')


  if (_lodash.default.isString(filePath)) {
    return _path.default.resolve(filePath);
  } // require('postcss-atom-star')


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
    } // ?????????????????????????????????????????????????????????????????????????????????????????????????????????


    (0, _registerConfigAsDependency.getModuleDependencies)(configPath).forEach(mdl => {
      delete require.cache[require.resolve(mdl.file)];
    });

    const config = require(configPath);

    return (0, _resolveConfig.default)([_constants.defaultConfig, config]);
  };
}

module.exports = _postcss.default.plugin("postcss-atom-star", config => {
  const plugins = [];
  const configPath = resolveConfigPath(config);

  if (!_lodash.default.isUndefined(configPath)) {
    // ????????????????????????webpack???????????????????????????????????????
    plugins.push((0, _registerConfigAsDependency.default)(configPath));
  }

  return (0, _postcss.default)([...plugins, (0, _processAtomStar.default)(getConfigFunction(configPath))]);
});