"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _display = _interopRequireDefault(require("./display"));

var _overflow = _interopRequireDefault(require("./overflow"));

var _position = _interopRequireDefault(require("./position"));

var _visibility = _interopRequireDefault(require("./visibility"));

var _zIndex = _interopRequireDefault(require("./zIndex"));

var _flex = _interopRequireDefault(require("./flex"));

var _margin = _interopRequireDefault(require("./margin"));

var _padding = _interopRequireDefault(require("./padding"));

var _width = _interopRequireDefault(require("./width"));

var _height = _interopRequireDefault(require("./height"));

var _font = _interopRequireDefault(require("./font"));

var _lineHeight = _interopRequireDefault(require("./lineHeight"));

var _textAlign = _interopRequireDefault(require("./textAlign"));

var _verticalAlign = _interopRequireDefault(require("./verticalAlign"));

var _whitespace = _interopRequireDefault(require("./whitespace"));

var _wordBreak = _interopRequireDefault(require("./wordBreak"));

var _color = _interopRequireDefault(require("./color"));

var _background = _interopRequireDefault(require("./background"));

var _border = _interopRequireDefault(require("./border"));

var _cursor = _interopRequireDefault(require("./cursor"));

var _outline = _interopRequireDefault(require("./outline"));

var _resize = _interopRequireDefault(require("./resize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const plugins = [
//     display,
//     overflow,
//     position,
//     visibility,
//     zIndex,
//     flex,
//     margin,
//     padding,
//     width,
//     height,
//     font,
//     lineHeight,
//     textAlign,
//     verticalAlign,
//     whitespace,
//     wordBreak,
//     color,
//     background,
//     border,
//     cursor,
//     outline,
//     resize,
// ];
const plugins = [_display.default, _textAlign.default, _color.default];
var _default = plugins;
exports.default = _default;