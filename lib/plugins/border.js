"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  const {
    addUtilities,
    variants
  } = pluginConfig;
  addUtilities({
    '.border-t': {
      border: 0,
      'border-top-width': '1px'
    },
    '.border-r': {
      border: 0,
      'border-right-width': '1px'
    },
    '.border-b': {
      border: 0,
      'border-bottom-width': '1px'
    },
    '.border-l': {
      border: 0,
      'border-left-width': '1px'
    }
  }, variants('borderWidth'));
  (0, _createUtilityPlugin.default)('borderWidth', [['border', ['border-width']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderColor', [['border', ['border-color']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderStyle', [['border', ['border-style']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderRadius', [['rounded', ['border-radius']]])(pluginConfig);
}