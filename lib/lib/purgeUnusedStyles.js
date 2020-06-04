"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = purgeUnusedUtilities;

var _lodash = _interopRequireDefault(require("lodash"));

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssPurgecss = _interopRequireDefault(require("@fullhuman/postcss-purgecss"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(...msgs) {
  console.log('  ', ...msgs);
}

function removeRiacssComments(css) {
  css.walkComments(comment => {
    switch (comment.text.trim()) {
      case 'riacss start utilities':
      case 'riacss start screens':
      case 'riacss end utilities':
      case 'riacss end screens':
        comment.remove();
        break;

      default:
        break;
    }
  });
}

function purgeUnusedUtilities(config) {
  const purgeEnabled = _lodash.default.get(config, 'purge.enabled', config.purge !== false && config.purge !== undefined && process.env.NODE_ENV === 'production');

  if (!purgeEnabled) {
    return removeRiacssComments;
  } // Skip if `purge: []` since that's part of the default config


  if (Array.isArray(config.purge) && config.purge.length === 0) {
    log();
    log(_chalk.default.yellow('Riacss is not purging unused styles because no template paths have been provided.'));
    log(_chalk.default.white(' If you have manually configured PurgeCSS outside of Riacss or are deliberately not\n      removing unused styles, set `purge: false` in your Riacss config file to silence\n      this warning.'));
    return removeRiacssComments;
  }

  return (0, _postcss.default)([function processor(css) {
    css.prepend(_postcss.default.comment({
      text: 'purgecss start ignore'
    }));
    css.append(_postcss.default.comment({
      text: 'purgecss end ignore'
    }));
    css.walkComments(comment => {
      switch (comment.text.trim()) {
        case 'riacss start utilities':
        case 'riacss start screens':
          comment.text = 'purgecss end ignore';
          break;

        case 'riacss end utilities':
        case 'riacss end screens':
          comment.text = 'purgecss start ignore';
          break;

        default:
          break;
      }
    });
  }, (0, _postcssPurgecss.default)({
    content: Array.isArray(config.purge) ? config.purge : config.purge.content,
    defaultExtractor: content => {
      // Capture as liberally as possible, including things like `h-(screen-1.5)`
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []; // Capture classes within other delimiters like .block(class="w-1/2") in Pug

      const innerMatches = content.match(/[^<>"'`\s.(){}\[\]#=%]*[^<>"'`\s.(){}\[\]#=%:]/g) || [];
      return broadMatches.concat(innerMatches);
    },
    ...config.purge.options
  })]);
}