"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  const {
    addUtilities
  } = pluginConfig;
  addUtilities({
    '.truncate': {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    }
  }, []); // word-wrap是ie兼容

  (0, _createUtilityPlugin.default)('overflowWrap', [['', ['overflow-wrap', 'word-wrap']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('wordBreak', [['', ['word-break']]])(pluginConfig);
}