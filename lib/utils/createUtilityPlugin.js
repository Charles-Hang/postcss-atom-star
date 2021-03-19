"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.className = className;
exports.default = createUtilityPlugin;

var _identity = _interopRequireDefault(require("lodash/identity"));

var _fromPairs = _interopRequireDefault(require("lodash/fromPairs"));

var _toPairs = _interopRequireDefault(require("lodash/toPairs"));

var _castArray = _interopRequireDefault(require("lodash/castArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function className(classPrefix, key, defaultPrefix) {
  if (key === 'default') {
    return classPrefix || defaultPrefix;
  }

  if (key === '-default') {
    return `${classPrefix || defaultPrefix}-default`;
  }

  if (!classPrefix) {
    return key;
  }

  return `${classPrefix}-${key}`;
}

function createUtilityPlugin(styleKey, utilityVariations) {
  return function utilityPlugin({
    escape,
    addUtilities,
    style
  }) {
    const utilities = utilityVariations.map(([classPrefix, properties, transformValue = _identity.default]) => (0, _fromPairs.default)((0, _toPairs.default)(style(styleKey)).map(([key, value]) => [`.${escape(className(classPrefix, key, styleKey))}`, (0, _fromPairs.default)((0, _castArray.default)(properties).map(property => [property, transformValue(value)]))])));
    return addUtilities(utilities);
  };
}