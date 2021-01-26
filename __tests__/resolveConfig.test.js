import resolveConfig from '../src/utils/resolveConfig';

test('空配置{}', () => {
    const userConfig = {};
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                },
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                },
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('覆盖默认screens配置', () => {
    const userConfig = {
        screens: {
            sm: '640px',
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        theme: {
            colors: {
                green: '#41d9a6',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                green: '#41d9a6',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('覆盖默认theme中的配置', () => {
    const userConfig = {
        theme: {
            colors: {
                gray: '#8795a1',
            },
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                },
                blue: 'blue',
            },
            spacing: {
                0: '0',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: '#8795a1',
            },
            spacing: {
                0: '0',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('覆盖默认style中的配置', () => {
    const userConfig = {
        style: {
            display: {
                flex: 'flex',
                'inline-flex': 'inline-flex',
            },
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                },
            },
        },
        style: {
            display: {
                hidden: 'none',
                block: 'block',
            },
            overflow: {
                auto: 'auto',
                hidden: 'hidden',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                },
            },
        },
        style: {
            display: {
                flex: 'flex',
                'inline-flex': 'inline-flex',
            },
            overflow: {
                auto: 'auto',
                hidden: 'hidden',
            },
        },
    });
});

test('默认theme中的方法配置方式', () => {
    const userConfig = {
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: '#8795a1',
            },
            backgroundColors: (theme) => theme('colors'),
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('theme中的方法配置方式', () => {
    const userConfig = {
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: (theme) => ({ ...theme('colors'), white: '#fff' }),
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: '#8795a1',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
                white: '#fff',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('theme extend中简单对象配置方式', () => {
    const userConfig = {
        theme: {
            extend: {
                colors: {
                    gray: {
                        light: '#dae1e7',
                    },
                },
                backgroundColors: {
                    white: '#fff',
                },
            },
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                },
            },
            backgroundColors: (theme) => theme('colors.gray'),
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: {
                    dark: '#8795a1',
                    light: '#dae1e7',
                },
            },
            backgroundColors: {
                dark: '#8795a1',
                light: '#dae1e7',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('theme extend中方法配置方式', () => {
    const userConfig = {
        theme: {
            extend: {
                colors: {
                    red: 'red',
                    green: 'green',
                    blue: 'blue',
                },
                backgroundColors: (theme) => ({ ...theme('colors'), white: '#fff' }),
            },
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: '#8795a1',
            },
            backgroundColors: {
                purple: 'purple',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
                gray: '#8795a1',
            },
            backgroundColors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
                gray: '#8795a1',
                white: '#fff',
                purple: 'purple',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('theme中覆盖配置与extend配置共同作用于相同属性', () => {
    const userConfig = {
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: (theme) => theme('colors'),
            extend: {
                backgroundColors: {
                    white: '#fff',
                },
            },
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: '#8795a1',
            },
            backgroundColors: {
                purple: 'purple',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
                white: '#fff',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('theme中的方法配置方式，获取不到时取默认值', () => {
    const userConfig = {
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: (theme) => ({
                gray: theme('colors.gray', 'gray'),
                white: '#fff',
            }),
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                gray: '#8795a1',
            },
            backgroundColors: {
                purple: 'purple',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            backgroundColors: {
                gray: 'gray',
                white: '#fff',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('theme中的方法配置能解析其他的方法配置', () => {
    const userConfig = {
        theme: {
            borderColors: (theme) => ({
                red: theme('backgroundColors.red'),
                gray: 'gray',
            }),
            backgroundColors: (theme) => theme('colors'),
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
            borderColors: {
                red: 'red',
                gray: 'gray',
            },
            backgroundColors: {
                red: 'red',
                green: 'green',
                blue: 'blue',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    });
});

test('style中的方法配置方式', () => {
    const userConfig = {
        style: {
            display: {
                flex: 'flex',
            },
            backgroundColor: (theme) => theme('backgroundColors'),
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            backgroundColors: {
                red: 'red',
                gray: 'gray',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            backgroundColors: {
                red: 'red',
                gray: 'gray',
            },
        },
        style: {
            display: {
                flex: 'flex',
            },
            backgroundColor: {
                red: 'red',
                gray: 'gray',
            },
        },
    });
});

test('style中的方法配置方式，获取不到时取默认值', () => {
    const userConfig = {
        style: {
            display: {
                flex: 'flex',
            },
            backgroundColor: (theme) => theme('backgroundColors', {
                blue: 'blue',
                purple: 'purple',
            }),
        },
    };
    const defaultConfig = {
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                gray: 'gray',
            },
        },
        style: {
            display: {
                hidden: 'none',
            },
        },
    };
    const result = resolveConfig([defaultConfig, userConfig]);

    expect(result).toMatchObject({
        screens: {
            sm: '640px',
        },
        theme: {
            colors: {
                red: 'red',
                gray: 'gray',
            },
        },
        style: {
            display: {
                flex: 'flex',
            },
            backgroundColor: {
                blue: 'blue',
                purple: 'purple',
            },
        },
    });
});
