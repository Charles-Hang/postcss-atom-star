"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _createUtilityPlugin = _interopRequireDefault(require("../utils/createUtilityPlugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  (0, _createUtilityPlugin.default)('backgroundAttachment', [['bg', ['background-attachment']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('backgroundPosition', [['bg', ['background-position']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('backgroundRepeat', [['bg', ['background-repeat']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('backgroundSize', [['bg', ['background-size']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('backgroundColor', [['bg', ['background-color']]])(pluginConfig);
}