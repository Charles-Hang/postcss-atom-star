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
    let hasScreensAtRule = false;
    css.walkAtRules('riacss', atRule => {
      if (atRule.params === 'utilities') {
        atRule.before(_postcss.default.comment({
          text: 'riacss start utilities'
        }));
        atRule.before(updateSource(utilities, atRule.source));
        atRule.after(_postcss.default.comment({
          text: 'riacss end utilities'
        }));
        atRule.remove();
      }

      if (atRule.params === 'screens') {
        hasScreensAtRule = true;
        atRule.before(_postcss.default.comment({
          text: 'riacss start screens'
        }));
        atRule.after(_postcss.default.comment({
          text: 'riacss end screens'
        }));
      }
    });

    if (!hasScreensAtRule) {
      css.append([_postcss.default.comment({
        text: 'riacss start screens'
      }), _postcss.default.atRule({
        name: 'riacss',
        params: 'screens'
      }), _postcss.default.comment({
        text: 'riacss end screens'
      })]);
    }
  };
}