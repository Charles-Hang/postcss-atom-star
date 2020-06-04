"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(result) {
  _fs.default.writeFile(_path.default.resolve('./output.md'), JSON.stringify(result), () => console.log('write over'));

  console.log(result, 'result');
}