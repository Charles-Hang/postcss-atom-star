"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveConfig;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveFunctionKeys(object, theme) {
  function themeGetter(pathStr, defaultValue) {
    const path = _lodash.default.toPath(pathStr);

    let index = 0;
    let val = theme;

    while (val !== undefined && val !== null && index < path.length) {
      val = val[path[index]];
      val = _lodash.default.isFunction(val) ? val(themeGetter) : val;
      index += 1;
    }

    return val === undefined ? defaultValue : val;
  }

  return Object.keys(object).reduce((resolved, key) => ({ ...resolved,
    [key]: _lodash.default.isFunction(object[key]) ? object[key](themeGetter) : object[key]
  }), {});
}

function mergeWithExtendProps(merged, extend) {
  return _lodash.default.mergeWith(merged, extend, (mergedValue, extendValue) => {
    if (_lodash.default.isUndefined(mergedValue)) {
      return [extendValue];
    }

    if (Array.isArray(mergedValue)) {
      return [extendValue, ...mergedValue];
    }

    return [extendValue, mergedValue];
  });
}

function mergeThemes(themes) {
  const theme = themes.reduce((merged, t) => ({ ...merged,
    ...t
  }), {}); // 将extend的属性连接为数组形式，备后续使用

  const extendWithArrayProps = themes.reduce((merged, {
    extend
  }) => mergeWithExtendProps(merged, extend), {});
  return { ...(({
      extend,
      ...t
    }) => t)(theme),
    extend: extendWithArrayProps
  };
}

function mergeExtends(theme, extend) {
  return _lodash.default.mergeWith(theme, extend, (themeValue, extendValue) => {
    // 对于像theme.colors这样的属性，不能直接合并，应该合并其下的font，background之类
    if (Object.values(themeValue).every(themeItem => typeof themeItem === 'object')) {
      const extendWithArrayProps = extendValue.reduce((merged, extendProp) => mergeWithExtendProps(merged, extendProp), {});
      return mergeExtends(themeValue, extendWithArrayProps);
    }

    return { ...themeValue,
      ...Object.assign({}, ...extendValue)
    };
  });
}

function resolveConfigTheme(configs) {
  const themes = configs.map(config => _lodash.default.get(config, 'theme', {}));
  const {
    extend,
    ...mergedTheme
  } = mergeThemes(themes);
  const theme = mergeExtends(mergedTheme, extend);
  return resolveFunctionKeys(theme, theme);
}

function resolveConfigStyle(configs, theme) {
  const style = configs.map(config => _lodash.default.get(config, 'style', {})).reduce((merged, s) => ({ ...merged,
    ...s
  }));
  return resolveFunctionKeys(style, theme);
}

function resolveConfig(configs) {
  const theme = resolveConfigTheme(configs);
  const style = resolveConfigStyle(configs, theme);
  return Object.assign({}, ...configs, {
    theme,
    style
  });
}