"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  (0, _createUtilityPlugin.default)('flex', [['flex', ['flex']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('flexDirection', [['flex', ['flex-direction']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('flexDirection', [['flex', ['flex-direction']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('flexWrap', [['flex', ['flex-wrap']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('flexShrink', [['flex-shrink', ['flex-shrink']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('flexGrow', [['flex-grow', ['flex-grow']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('alignItems', [['items', ['align-items']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('alignContent', [['content', ['align-content']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('justifyContent', [['justify', ['justify-content']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('alignSelf', [['self', ['align-self']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('order', [['order', ['order']]])(pluginConfig);
}