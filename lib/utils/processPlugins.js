"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _node = _interopRequireDefault(require("postcss/lib/node"));

var _escapeClassName = _interopRequireDefault(require("./escapeClassName"));

var _parseObjectStyles = _interopRequireDefault(require("./parseObjectStyles"));

var _wrapWithVariants = _interopRequireDefault(require("./wrapWithVariants"));

var _generateVariantFunction = _interopRequireDefault(require("./generateVariantFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseStyles(styles) {
  if (!Array.isArray(styles)) {
    return parseStyles([styles]);
  }

  return _lodash.default.flatMap(styles, style => style instanceof _node.default ? style : (0, _parseObjectStyles.default)(style));
}

function _default(plugins, config) {
  const parsedUtilities = [];
  const variantGenerators = {};

  const getConfigValue = (path, defaultValue) => _lodash.default.get(config, path, defaultValue);

  plugins.forEach(plugin => {
    plugin({
      config: getConfigValue,
      style: (path, defaultValue) => getConfigValue(`style.${path}`, defaultValue),
      variants: (path, defaultValue) => {
        if (Array.isArray(config.variants)) {
          return config.variants;
        }

        return getConfigValue(`variants.${path}`, defaultValue);
      },
      escape: _escapeClassName.default,
      addUtilities: (utilities, variants = []) => {
        const rules = parseStyles(utilities);

        if (!rules.length) {
          return;
        }

        parsedUtilities.push((0, _wrapWithVariants.default)(rules, variants));
      },
      addVariant: (name, generator) => {
        variantGenerators[name] = (0, _generateVariantFunction.default)(generator);
      }
    });
  });
  return {
    utilities: parsedUtilities,
    variantGenerators
  };
}