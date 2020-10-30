"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _buildMediaQuery = _interopRequireDefault(require("../utils/buildMediaQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default({
  screens
}) {
  return function processor(css) {
    css.walkAtRules('screen', atRule => {
      const screen = atRule.params;

      if (!_lodash.default.has(screens, screen)) {
        throw atRule.error(`No \`${screen}\` screen found.`);
      }

      atRule.name = 'media';
      atRule.params = (0, _buildMediaQuery.default)(screens[screen]);
    });
  };
}