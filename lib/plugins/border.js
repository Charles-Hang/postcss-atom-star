"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _lodash = _interopRequireDefault(require("lodash"));

var _createUtilityPlugin = _interopRequireWildcard(require("../utils/createUtilityPlugin"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pluginConfig) {
  const {
    addUtilities,
    escape,
    style
  } = pluginConfig;

  const genderator = (value, key) => ({
    [`.${escape((0, _createUtilityPlugin.className)('border', key, 'borderWidth'))}`]: {
      'border-width': `${value}`
    },
    [`.${escape((0, _createUtilityPlugin.className)('border-t', key, 'borderWidth'))}`]: {
      'border-top-width': `${value}`
    },
    [`.${escape((0, _createUtilityPlugin.className)('border-r', key, 'borderWidth'))}`]: {
      'border-right-width': `${value}`
    },
    [`.${escape((0, _createUtilityPlugin.className)('border-b', key, 'borderWidth'))}`]: {
      'border-bottom-width': `${value}`
    },
    [`.${escape((0, _createUtilityPlugin.className)('border-l', key, 'borderWidth'))}`]: {
      'border-left-width': `${value}`
    }
  });

  const utilities = _lodash.default.flatMap(style('borderWidth'), genderator);

  addUtilities(utilities);
  (0, _createUtilityPlugin.default)('borderColor', [['border', ['border-color']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderStyle', [['border', ['border-style']]])(pluginConfig);
  (0, _createUtilityPlugin.default)('borderRadius', [['rounded', ['border-radius']]])(pluginConfig);
}