"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  (0, _createUtilityPlugin.default)('position', [['', ['position']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('positionSpacing', [['top', ['top']], ['right', ['right']], ['bottom', ['bottom']], ['left', ['left']]])(pluginConfig);
}