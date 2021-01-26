import _ from 'lodash';

function resolveFunctionKeys(object, theme) {
    function themeGetter(pathStr, defaultValue) {
        const path = _.toPath(pathStr);
        let index = 0;
        let val = theme;

        while (val !== undefined && val !== null && index < path.length) {
            val = val[path[index]];
            val = _.isFunction(val) ? val(themeGetter) : val;
            index += 1;
        }

        return val === undefined ? defaultValue : val;
    }

    return Object.keys(object).reduce((resolved, key) => ({
        ...resolved,
        [key]: _.isFunction(object[key]) ? object[key](themeGetter) : object[key],
    }), {});
}

function mergeWithExtendProps(merged, extend) {
    return _.mergeWith(merged, extend, (mergedValue, extendValue) => {
        if (_.isUndefined(mergedValue)) {
            return [extendValue];
        }

        if (Array.isArray(mergedValue)) {
            return [extendValue, ...mergedValue];
        }

        return [extendValue, mergedValue];
    });
}

function mergeThemes(themes) {
    const theme = themes.reduce((merged, t) => ({
        ...merged,
        ...t,
    }), {});
    // 将extend的属性连接为数组形式，备后续使用
    const extendWithArrayProps = themes.reduce(
        (merged, { extend }) => mergeWithExtendProps(merged, extend),
        {},
    );

    return {
        ...(({ extend, ...t }) => t)(theme),
        extend: extendWithArrayProps,
    };
}

function mergeExtends(theme, extend) {
    return _.mergeWith(theme, extend, (themeValue, extendValue) => {
        if (!_.isFunction(themeValue) && !_.some(extendValue, _.isFunction)) {
            return _.mergeWith({}, themeValue, ...extendValue);
        }

        return (themeGetter) => _.mergeWith(
            {},
            ...[themeValue, ...extendValue].map((e) => (_.isFunction(e) ? e(themeGetter) : e)),
        );
    });
}

function resolveConfigTheme(configs) {
    const themes = configs.map((config) => _.get(config, 'theme', {}));
    const { extend, ...mergedTheme } = mergeThemes(themes);
    const theme = mergeExtends(mergedTheme, extend);

    return resolveFunctionKeys(theme, theme);
}

function resolveConfigStyle(configs, theme) {
    const style = configs
        .map((config) => _.get(config, 'style', {}))
        .reduce((merged, s) => ({
            ...merged,
            ...s,
        }));

    return resolveFunctionKeys(style, theme);
}

export default function resolveConfig(configs) {
    const theme = resolveConfigTheme(configs);
    const style = resolveConfigStyle(configs, theme);

    return Object.assign({}, ...configs, {
        theme,
        style,
    });
}
