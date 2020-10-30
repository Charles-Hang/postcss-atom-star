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

var _minWidth = _interopRequireDefault(require("./minWidth"));

var _minHeight = _interopRequireDefault(require("./minHeight"));

var _maxWidth = _interopRequireDefault(require("./maxWidth"));

var _maxHeight = _interopRequireDefault(require("./maxHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const plugins = [_display.default, _overflow.default, _position.default, _visibility.default, _zIndex.default, _flex.default, _margin.default, _padding.default, _width.default, _height.default, _font.default, _lineHeight.default, _textAlign.default, _verticalAlign.default, _whitespace.default, _wordBreak.default, _color.default, _background.default, _border.default, _cursor.default, _outline.default, _resize.default, _minWidth.default, _minHeight.default, _maxWidth.default, _maxHeight.default];
var _default = plugins;
exports.default = _default;