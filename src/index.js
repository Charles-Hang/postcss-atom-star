import postcss from 'postcss';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import registerConfigAsDependency, { getModuleDependencies } from './lib/registerConfigAsDependency';
import resolveConfig from './utils/resolveConfig';
import { defaultConfig, defaultConfigPath } from './constants';
import processTigerRia from './processTigerRia';

function resolveConfigPath(filePath) {
    // require('postcss-tiger-ria')({ theme: ..., variants: ... })
    if (_.isObject(filePath) && !_.has(filePath, 'config') && !_.isEmpty(filePath)) {
        return undefined;
    }

    // require('postcss-tiger-ria')({ config: 'custom-config.js' })
    if (_.isObject(filePath) && _.has(filePath, 'config') && _.isString(filePath.config)) {
        return path.resolve(filePath.config);
    }

    // require('postcss-tiger-ria')({ config: { theme: ..., variants: ... } })
    if (_.isObject(filePath) && _.has(filePath, 'config') && _.isObject(filePath.config)) {
        return undefined;
    }

    // require('postcss-tiger-ria')('custom-config.js')
    if (_.isString(filePath)) {
        return path.resolve(filePath);
    }

    // require('postcss-tiger-ria')
    try {
        const configPath = path.resolve(defaultConfigPath);
        fs.accessSync(configPath);
        return configPath;
    } catch (err) {
        return undefined;
    }
}

function getConfigFunction(configPath) {
    return function getConfig() {
        if (_.isUndefined(configPath)) {
            return resolveConfig([defaultConfig]);
        }

        // 需要将配置文件缓存清除，否则改变配置后即使重新编译获取到的数据也是旧的
        getModuleDependencies(configPath).forEach((mdl) => {
            delete require.cache[require.resolve(mdl.file)];
        });

        const config = require(configPath);

        return resolveConfig([defaultConfig, config]);
    };
}

module.exports = postcss.plugin('postcss-tiger-ria', (config) => {
    const plugins = [];
    const configPath = resolveConfigPath(config);

    if (!_.isUndefined(configPath)) {
        // 将配置文件注册为webpack依赖，改变配置后则重新编译
        plugins.push(registerConfigAsDependency(configPath));
    }

    return postcss([
        ...plugins,
        processTigerRia(getConfigFunction(configPath)),
    ]);
});
