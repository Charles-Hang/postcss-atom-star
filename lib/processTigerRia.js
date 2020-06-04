"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _postcss = _interopRequireDefault(require("postcss"));

var _lodash = _interopRequireDefault(require("lodash"));

var _processPlugins = _interopRequireDefault(require("./utils/processPlugins"));

var _plugins = _interopRequireDefault(require("./plugins"));

var _substituteRiacssAtRules = _interopRequireDefault(require("./lib/substituteRiacssAtRules"));

var _substituteVariantsAtRules = _interopRequireDefault(require("./lib/substituteVariantsAtRules"));

var _substituteResponsiveAtRules = _interopRequireDefault(require("./lib/substituteResponsiveAtRules"));

var _substituteScreenAtRules = _interopRequireDefault(require("./lib/substituteScreenAtRules"));

var _substituteClassApplyAtRules = _interopRequireDefault(require("./lib/substituteClassApplyAtRules"));

var _purgeUnusedStyles = _interopRequireDefault(require("./lib/purgeUnusedStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(getConfig) {
  return function processor(css) {
    const config = getConfig();
    const processedPlugins = (0, _processPlugins.default)([..._plugins.default, ...config.plugins], config);
    return (0, _postcss.default)([(0, _substituteRiacssAtRules.default)(processedPlugins.utilities), (0, _substituteVariantsAtRules.default)(config, processedPlugins), (0, _substituteResponsiveAtRules.default)(config), (0, _substituteScreenAtRules.default)(config), (0, _substituteClassApplyAtRules.default)(processedPlugins.utilities), (0, _purgeUnusedStyles.default)(config)]).process(css, {
      from: _lodash.default.get(css, 'source.input.file')
    });
  };
}