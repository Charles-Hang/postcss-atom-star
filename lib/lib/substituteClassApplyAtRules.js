"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

var _escapeClassName = _interopRequireDefault(require("../utils/escapeClassName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildClassTable(css) {
  const classTable = {};
  css.walkRules(rule => {
    if (!_lodash.default.has(classTable, rule.selector)) {
      classTable[rule.selector] = [];
    }

    classTable[rule.selector].push(rule);
  });
  return classTable;
}

function buildShadowTable(generatedUtilities) {
  const utilities = _postcss.default.root({
    nodes: generatedUtilities
  });

  return buildClassTable(utilities);
}

function normalizeClassName(className) {
  return `.${(0, _escapeClassName.default)(_lodash.default.trimStart(className, '.'))}`;
}

function findClass(classToApply, classTable, onError) {
  const matches = _lodash.default.get(classTable, classToApply, []);

  if (_lodash.default.isEmpty(matches)) {
    return [];
  }

  if (matches.length > 1) {
    // prettier-ignore
    throw onError(`\`@apply\` cannot be used with ${classToApply} because ${classToApply} is included in multiple rulesets.`);
  }

  const [match] = matches;

  if (match.parent.type !== 'root') {
    // prettier-ignore
    throw onError(`\`@apply\` cannot be used with ${classToApply} because ${classToApply} is nested inside of an at-rule (@${match.parent.name}).`);
  }

  return match.clone().nodes;
}

function _default(generatedUtilities) {
  return function processor(css) {
    const classLookup = buildClassTable(css);
    const shadowLookup = buildShadowTable(generatedUtilities);
    css.walkRules(rule => {
      rule.walkAtRules('apply', atRule => {
        const classes = _postcss.default.list.space(atRule.params);

        const decls = (0, _lodash.default)(classes).flatMap(cssClass => {
          const classToApply = normalizeClassName(cssClass);

          const onError = message => {
            return atRule.error(message);
          };

          return _lodash.default.reduce([// Find exact class match in user's CSS
          () => {
            return findClass(classToApply, classLookup, onError);
          }, // Find exact class match in shadow lookup(utilities)
          () => {
            return findClass(classToApply, shadowLookup, onError);
          }, () => {
            // prettier-ignore
            throw onError(`\`@apply\` cannot be used with \`${classToApply}\` because \`${classToApply}\` either cannot be found, or its actual definition includes a pseudo-selector like :hover, :active, etc. If you're sure that \`${classToApply}\` exists, make sure that any \`@import\` statements are being properly processed *before* RIA CSS sees your CSS, as \`@apply\` can only be used for classes in the same CSS tree.`);
          }], (classDecls, candidate) => !_lodash.default.isEmpty(classDecls) ? classDecls : candidate(), []);
        }).value();
        atRule.before(decls);
        atRule.remove();
      });
    });
  };
}