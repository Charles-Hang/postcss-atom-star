"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  (0, _createUtilityPlugin.default)('overflow', [['overflow', ['overflow']], ['overflow-x', ['overflow-x']], ['overflow-y', ['overflow-y']]])(pluginConfig);
}