"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateSource(nodes, source) {
  return _lodash.default.tap(Array.isArray(nodes) ? _postcss.default.root({
    nodes
  }) : nodes, tree => {
    tree.walk(node => {
      node.source = source;
    });
  });
}

function _default(utilities) {
  return function processor(css) {
    css.walkAtRules('riacss', atRule => {
      if (atRule.params === 'utilities') {
        atRule.before(updateSource(utilities, atRule.source));
        atRule.remove();
      }
    });
  };
}