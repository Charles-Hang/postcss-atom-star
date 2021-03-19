"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _postcss = _interopRequireDefault(require("postcss"));

var _lodash = _interopRequireDefault(require("lodash"));

var _processPlugins = _interopRequireDefault(require("./utils/processPlugins"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _substituteAtomstarcssAtRules = _interopRequireDefault(require("./lib/substituteAtomstarcssAtRules"));

var _substituteScreenAtRules = _interopRequireDefault(require("./lib/substituteScreenAtRules"));

var _substituteClassApplyAtRules = _interopRequireDefault(require("./lib/substituteClassApplyAtRules"));

var _evaluateAtomstarcssFunctions = _interopRequireDefault(require("./lib/evaluateAtomstarcssFunctions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(getConfig) {
  return function processor(css) {
    const config = getConfig();
    const processedPlugins = (0, _processPlugins.default)([..._plugins.default, ...config.plugins], config);
    return (0, _postcss.default)([(0, _substituteAtomstarcssAtRules.default)(processedPlugins.utilities), (0, _evaluateAtomstarcssFunctions.default)(config), (0, _substituteScreenAtRules.default)(config), (0, _substituteClassApplyAtRules.default)(processedPlugins.utilities)]).process(css, {
      from: _lodash.default.get(css, 'source.input.file')
    });
  };
}