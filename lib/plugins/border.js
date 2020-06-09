"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  const {
    addUtilities,
    variants,
    escape,
    style
  } = pluginConfig;

  const genderator = (value, key) => ({
    [`.${key === 'default' ? 'border' : escape(`border-${key}`)}`]: {
      'border-width': `${value}`
    },
    [`.${key === 'default' ? 'border-t' : escape(`border-t-${key}`)}`]: {
      border: 0,
      'border-top-width': `${value}`
    },
    [`.${key === 'default' ? 'border-r' : escape(`border-r-${key}`)}`]: {
      border: 0,
      'border-right-width': `${value}`
    },
    [`.${key === 'default' ? 'border-b' : escape(`border-b-${key}`)}`]: {
      border: 0,
      'border-bottom-width': `${value}`
    },
    [`.${key === 'default' ? 'border-l' : escape(`border-l-${key}`)}`]: {
      border: 0,
      'border-left-width': `${value}`
    }
  });

  const utilities = _lodash.default.flatMap(style('borderWidth'), genderator);

  addUtilities(utilities, variants('borderWidth'));
  (0, _createUtilityPlugin.default)('borderWidth', [['border', ['border-width']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderColor', [['border', ['border-color']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderStyle', [['border', ['border-style']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderRadius', [['rounded', ['border-radius']]])(pluginConfig);
}