"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluateAtomstarcssFunctions;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcssFunctions = _interopRequireDefault(require("postcss-functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function evaluateAtomstarcssFunctions(config) {
  return (0, _postcssFunctions.default)({
    functions: {
      theme: (path, ...defaultValue) => {
        return _lodash.default.thru(_lodash.default.get(config.theme, _lodash.default.trim(path, '\'"'), defaultValue), value => {
          return Array.isArray(value) ? value.join(', ') : value;
        });
      }
    }
  });
}