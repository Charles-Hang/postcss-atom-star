"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModuleDependencies = getModuleDependencies;
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _resolve = _interopRequireDefault(require("resolve"));

var _detective = _interopRequireDefault(require("detective"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createModule(file) {
  const source = _fs.default.readFileSync(file, 'utf-8');

  const requires = (0, _detective.default)(source);
  return {
    file,
    requires
  };
}

function getModuleDependencies(entryFile) {
  const rootModule = createModule(entryFile);
  const modules = [rootModule]; // Iterate over the modules, even when new
  // ones are being added

  for (const mdl of modules) {
    mdl.requires.filter(dep => {
      // Only track local modules, not node_modules
      return dep.startsWith('./') || dep.startsWith('../');
    }).forEach(dep => {
      try {
        const basedir = _path.default.dirname(mdl.file);

        const depPath = _resolve.default.sync(dep, {
          basedir
        });

        const depModule = createModule(depPath);
        modules.push(depModule);
      } catch (_err) {// eslint-disable-next-line no-empty
      }
    });
  }

  return modules;
}

function _default(configFile) {
  if (!_fs.default.existsSync(configFile)) {
    throw new Error(`Specified postcss-atom-star config file "${configFile}" doesn't exist.`);
  }

  return function processor(css, opts) {
    getModuleDependencies(configFile).forEach(mdl => {
      opts.messages.push({
        type: 'dependency',
        parent: css.source.input.file,
        file: mdl.file
      });
    });
  };
}