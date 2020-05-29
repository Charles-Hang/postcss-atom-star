import postcss from 'postcss';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
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

        const config = require(configPath);

        return resolveConfig([defaultConfig, config]);
    };
}

module.exports = postcss.plugin('postcss-tiger-ria', (config) => {
    const configPath = resolveConfigPath(config);

    return postcss([processTigerRia(getConfigFunction(configPath))]);
});
