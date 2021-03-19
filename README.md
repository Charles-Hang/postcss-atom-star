# PostCSS Atom Star

一个 postcss 插件，获得原子化的 css 开发体验，能极大缩减最终 css 文件的大小。借鉴于[tailwindcss]

[tailwindcss]: https://tailwindcss.com/

<!-- TOC -->

- [PostCSS Atom Star](#postcss-atom-star)
    - [安装](#安装)
    - [vscode 补全提示插件](#vscode-补全提示插件)
    - [文档](#文档)
        - [基本使用](#基本使用)
            - [工具类](#工具类)
            - [@apply](#apply)
            - [theme()](#theme)
            - [@screen](#screen)
        - [配置](#配置)
            - [screens](#screens)
            - [theme](#theme)
            - [style](#style)
            - [plugins](#plugins)
                - [自定义工具类](#自定义工具类)

<!-- /TOC -->

## 安装

```
npm i -D postcss-atom-star
```

依赖于[postcss]，将本插件加入 postcss 插件列表即可

```diff
// example postcss.config.js
module.exports = {
    plugins: [
+       require('postcss-atom-star'),
        require('autoprefixer')
    ]
}
```

[postcss]: https://github.com/postcss/postcss#usage

## vscode 补全提示插件

vscode 下提供了补全提示插件[atom star auto complete]

[atom star auto complete]: https://marketplace.visualstudio.com/items?itemName=hswxing.atom-star-auto-complete

## 文档

### 基本使用

#### 工具类

本 postcss 插件的核心功能便是通过配置文件，按原子化的思想生成工具类以供开发使用，例如

```jsx
{
    /* react组件中 */
}
<div className="p-24 rounded">
    <h3 className="font-16 text-black">title</h3>
    <p className="text-gray">this is a message.</p>
</div>;
```

其中，p-24 -> padding: 24px， rounded -> border-radius: 4px，font-16 -> font-size: 16px，text-black -> text-color: #333，text-gray -> text-color: #888e98，开发时顺着思路将这些基础的工具类写出即可，可通过配置文件修改及添加新的工具类，配置相关的说明后面会具体再说

开启这一功能需要在你的样式文件中写入`@atomstarcss utilities;`，便会在这个位置插入你所需的工具类：

```css
/* 你的样式文件 */
/* 生成的工具类会插入到这个位置 */
@atomstarcss utilities;
```

#### @apply

也可在你的样式文件中使用工具类：

```css
.btn {
    @apply font-bold py-8 px-16 rounded;
    /* custom css */
}
.btn-blue {
    @apply bg-blue text-white;
    /* custom css */
}

/* 或者 */
.btn {
    @apply font-bold;
    @apply py-8;
    @apply px-16;
    @apply rounded;
    /* custom css */
}
.btn-blue {
    @apply bg-blue;
    @apply text-white;
    /* custom css */
}
```

不支持!important 的功能

#### theme()

当@apply 不能满足开发需求时，可以使用 theme()方法调用配置文件中 theme 里配置的变量：

```css
.btn {
    background: theme("colors.gray.light");
}
```

#### @screen

提供了一种便捷的响应式媒体查询使用方式：

```css
@screen md {
    .btn {
        @apply font-bold py-8 px-16 rounded;
        /* custom css */
    }
    /* custom css */
}

/* 相当于 */

@media (min-width: 640px) {
    .btn {
        @apply font-bold py-8 px-16 rounded;
        /* custom css */
    }
    /* custom css */
}
```

md 为配置文件中 screens 中的项，(min-width: 640px)为 md 的配置，配置相关的说明后面会具体再说

### 配置

默认情况下，会在你的项目根目录寻找名为 atomstarcss.config.js 的配置文件，也可以自定义配置文件路径

```js
// postcss.config.js
module.exports = {
    plugins: [require("postcss-atom-star")("./atomstarcss-config.js")],
};
```

```js
// 举例，你的配置文件
module.exports = {
    screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
    },
    theme: {
        extend: {
            colors: {
                font: {
                    cyan: "#9cdbff",
                },
            },
        },
    },
    style: {
        display: {
            hidden: "none",
            block: "block",
            "inline-block": "inline-block",
            inline: "inline",
            flex: "flex",
            "inline-flex": "inline-flex",
        },
        zIndex: (theme) => theme("size.zIndex"),
    },
    plugins: [],
};
```

#### screens

screens 配置的属性名就是@screen 便捷媒体查询的参数。属性值则有以下几种配法：

```js
// atomstarcss.config.js
module.exports = {
    screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px) and (max-width: 1023px) { ... }

        lg: { max: "1024px" },
        // => @media (max-width: 1024px) { ... }

        xl: [{ min: "1200px", max: "1400px" }, { min: "1500px" }],
        // => @media (min-width: 1200px) and (max-width: 1400px), (min-width: 1500px) { ... }

        portrait: { raw: "(orientation: portrait)" },
        // => @media (orientation: portrait) { ... }
    },
};
```

#### theme

theme 是要用到的定制主题，theme 的属性的定义会直接覆盖默认配置，如果只是想拓展而不是覆盖则使用 extend 来配置即可，如上面的例子。theme 可随意配置，theme 配置的属性既可以是对象也可以是方法，这个方法可以获取自身的配置，如下：

```js
theme: {
    colors: {
        gray: {
            default: '#9da6c3',
            light: '#c4cadb',
        }
    },
    fontColors: theme => ({
        gray: theme('colors.gray.default')
    }),
    backgroundColors: theme => ({
        gray: theme('colors.gray.light')
    })
}
```

默认配置为：

```js
theme: {
    colors: {
        font: {
            // 主题色
            blue: '#4c84ff',
            // 对应设计规范主文字色值
            black: '#324580',
            // 对应设计规范二级文字色值
            gray: '#9da6c3',
            // 对应设计规范三级文字色值
            'gray-light': '#c4cadb',
            green: '#41d9a6',
            red: '#ff8080',
            purple: '#9e63f0',
            yellow: '#ffba1a',
            white: '#fff',
        },
        background: {
            transparent: 'transparent',
            // 对应设计规范背景色值
            'gray-light': '#f8fafc',
            gray: '#f3f6fb',
            blue: '#e9f0ff',
            green: '#e8faf4',
            red: '#ffefef',
            purple: '#f4f0fd',
            yellow: '#fff6e4',
            white: '#fff',
        },
        border: {
            gray: '#f5f7f9',
            blue: '#4c84ff',
            red: '#ff8080',
        },
    },
    spacing: {
        marginPadding: {
            0: '0',
            4: '4px',
            6: '6px',
            8: '8px',
            10: '10px',
            12: '12px',
            16: '16px',
            20: '20px',
            24: '24px',
            40: '40px',
        },
        content: {
            auto: 'auto',
            full: '100%',
            14: '14px',
            18: '18px',
            20: '20px',
            24: '24px',
            32: '32px',
            64: '64px',
        },
    },
    size: {
        font: {
            12: '12px',
            13: '13px',
            14: '14px',
            16: '16px',
            18: '18px',
            20: '20px',
            24: '24px',
        },
        leading: {
            normal: '1.5',
            24: '24px',
            32: '32px',
            64: '64px',
        },
        zIndex: {
            0: '0',
            1: '1',
            2: '2',
            100: '100',
            200: '200',
            500: '500',
            1000: '1000',
        },
    },
},
```

#### style

style 是生成工具类的具体定义，style 对象里的键名不可更改，只可配置属性值。style 里的属性值既可以是对象也可以是个方法，方法的参数就是用于获取 theme 配置的方法，如上面的例子。工具类的生成上按一定的规则，key 拼在类名中，key 为`default`时表示不拼接，若就想拼 default 则使用`-default`代替，value 拼在属性中，下面是默认的配置说明

```js
// 默认的style配置
style: {
    // .${key} { display: ${value}}
    display: {
        hidden: 'none',
        block: 'block',
        'inline-block': 'inline-block',
        inline: 'inline',
        flex: 'flex',
        'inline-flex': 'inline-flex',
    },
    // .overflow-${key} { overflow: ${value}}
    // .overflow-x-${key} { overflow-x: ${value}}
    // .overflow-y-${key} { overflow-y: ${value}}
    overflow: {
        auto: 'auto',
        hidden: 'hidden',
        visible: 'visible',
        scroll: 'scroll',
    },
    // .${key} { position: ${value}}
    position: {
        static: 'static',
        relative: 'relative',
        absolute: 'absolute',
        fixed: 'fixed',
    },
    /**
     * .top-${key} { top: ${value}}
     * .right-${key} { right: ${value}}
     * .bottom-${key} { bottom: ${value}}
     * .left-${key} { left: ${value}}
     */
    positionSpacing: {
        0: '0',
    },
    // .${key} { visibility: ${value}}
    visibility: {
        visible: 'visible',
        invisible: 'hidden',
    },
    // .z-${key} { z-index: ${value}}
    zIndex: (theme) => theme('size.zIndex'),
    // .flex-${key} { flex: ${value}}
    flex: {
        1: '1 1 0%',
        auto: '1 1 auto',
        initial: '0 1 auto',
        none: 'none',
    },
    // .flex-${key} { flex-direction: ${value}}
    flexDirection: {
        row: 'row',
        'row-reverse': 'row-reverse',
        col: 'column',
        'col-reverse': 'column-reverse',
    },
    // .flex-${key} { flex-wrap: ${value}}
    flexWrap: {
        wrap: 'wrap',
        'wrap-reverse': 'wrap-reverse',
        'no-wrap': 'nowrap',
    },
    // .flex-shrink-${key} { flex-shrink: ${value}}
    flexShrink: {
        0: '0',
        default: '1',
    },
    // .flex-grow-${key} { flex-grow: ${value}}
    flexGrow: {
        0: '0',
        default: '1',
    },
    // .items-${key} { align-items: ${value}}
    alignItems: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        baseline: 'baseline',
        stretch: 'stretch',
    },
    // .content-${key} { align-content: ${value}}
    alignContent: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        between: 'space-between',
        around: 'space-around',
    },
    // .justify-${key} { justify-content: ${value}}
    justifyContent: {
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        between: 'space-between',
        around: 'space-around',
    },
    // .self-${key} { align-self: ${value}}
    alignSelf: {
        auto: 'auto',
        start: 'flex-start',
        end: 'flex-end',
        center: 'center',
        stretch: 'stretch',
        baseline: 'baseline',
    },
    // .order-${key} { order: ${value}}
    order: {
        first: '-9999',
        last: '9999',
    },
    /**
     * .m-${key} { margin: ${value}}
     * .mx-${key} { margin-left: ${value}; margin-right: ${value}}
     * .my-${key} { margin-top: ${value}; margin-bottom: ${value}}
     * .mt-${key} { margin-top: ${value}}
     * .mr-${key} { margin-right: ${value}}
     * .mb-${key} { margin-bottom: ${value}}
     * .ml-${key} { margin-left: ${value}}
     */
    margin: (theme) => ({
        auto: 'auto',
        ...theme('spacing.marginPadding'),
    }),
    /**
     * .p-${key} { padding: ${value}}
     * .px-${key} { padding-left: ${value}; padding-right: ${value}}
     * .py-${key} { padding-top: ${value}; padding-bottom: ${value}}
     * .pt-${key} { padding-top: ${value}}
     * .pr-${key} { padding-right: ${value}}
     * .pb-${key} { padding-bottom: ${value}}
     * .pl-${key} { padding-left: ${value}}
     */
    padding: (theme) => theme('spacing.marginPadding'),
    // .w-${key} { width: ${value}}
    width: (theme) => theme('spacing.content'),
    // .h-${key} { height: ${value}}
    height: (theme) => theme('spacing.content'),
    // .min-w-${key} { min-width: ${value}}
    minWidth: {
        0: '0',
        full: '100%',
    },
    // .min-h-${key} { min-height: ${value}}
    minHeight: {
        0: '0',
        full: '100%',
    },
    // .max-w-${key} { max-width: ${value}}
    maxWidth: {
        0: '0',
        full: '100%',
    },
    // .max-h-${key} { max-height: ${value}}
    maxHeight: {
        0: '0',
        full: '100%',
    },
    // .font-${key} { font-size: ${value}}
    fontSize: (theme) => theme('size.font'),
    // .font-${key} { font-weight: ${value}}
    fontWeight: {
        normal: '400',
        bold: '600',
    },
    // .leading-${key} { line-height: ${value}}
    lineHeight: (theme) => theme('size.leading'),
    // .text-${key} { text-align: ${value}}
    textAlign: {
        left: 'left',
        center: 'center',
        right: 'right',
        baseline: 'baseline',
    },
    // .align-${key} { vertical-align: ${value}}
    verticalAlign: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom',
    },
    // .whitespace-${key} { white-space: ${value}}
    whitespace: {
        normal: 'normal',
        'no-wrap': 'nowrap',
        pre: 'pre',
        'pre-line': 'pre-line',
        'pre-wrap': 'pre-wrap',
    },
    // .${key} { overflow-wrap: ${value}}
    overflowWrap: {
        'break-words': 'break-word',
    },
    // .${key} { word-break: ${value}}
    wordBreak: {
        'break-all': 'break-all',
    },
    // .text-${key} { color: ${value}}
    color: (theme) => theme('colors.font'),
    // .bg-${key} { background-attachment: ${value}}
    backgroundAttachment: {
        fixed: 'fixed',
        scroll: 'scroll',
    },
    // .bg-${key} { background-position: ${value}}
    backgroundPosition: {
        left: 'left',
        center: 'center',
        right: 'right',
        top: 'top',
        bottom: 'bottom',
    },
    // .bg-${key} { background-repeat: ${value}}
    backgroundRepeat: {
        'no-repeat': 'no-repeat',
    },
    // .bg-${key} { background-size: ${value}}
    backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        full: '100% 100%',
        'full-auto': '100%',
    },
    // .bg-${key} { background-color: ${value}}
    backgroundColor: (theme) => theme('colors.background'),
    /**
     * .border-${key} { border-width: ${value}}
     * .border-t-${key} { border-top-width: ${value}}
     * .border-r-${key} { border-right-width: ${value}}
     * .border-b-${key} { border-bottom-width: ${value}}
     * .border-l-${key} { border-left-width: ${value}}
     */
    borderWidth: {
        default: '1px',
        0: '0',
    },
    // .border-${key} { border-color: ${value}}
    borderColor: (theme) => theme('colors.border'),
    // .border-${key} { border-style: ${value}}
    borderStyle: {
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted',
    },
    // .rounded-${key} { border-radius: ${value}}
    borderRadius: {
        default: '4px',
        none: '0',
        full: '9999px',
    },
    // .cursor-${key} { cursor: ${value}}
    cursor: {
        auto: 'auto',
        default: 'default',
        pointer: 'pointer',
        move: 'move',
        'not-allow': 'not-allowed',
    },
    // .outline-${key} { outline: ${value}}
    outline: {
        none: '0',
    },
    // .resize-${key} { resize: ${value}}
    resize: {
        default: 'both',
        none: 'none',
    },
}
```

除了上面的类还有一个:

```css
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

#### plugins

plugins 是用于自定义工具类的插件，默认为空数组

```js
// atomstarcss.config.js
module.exports = {
    plugins: [
        function ({ addUtilities, escape, config, style }) {
            // 自定义插件内容
        },
    ],
};
```

`addUtilities()`用于添加自定义工具类

`escape()`用于转义要在类名中使用的字符串

`config()`用于获取配置文件的信息如 config('theme.colors')

`style()`用于获取配置文件里 style 的信息如 style('display')

##### 自定义工具类

```js
// atomstarcss.config.js
module.exports = {
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".rotate-0": {
                    transform: "rotate(0deg)",
                },
                ".rotate-90": {
                    transform: "rotate(90deg)",
                },
                ".rotate-180": {
                    transform: "rotate(180deg)",
                },
                ".rotate-270": {
                    transform: "rotate(270deg)",
                },
            };

            addUtilities(newUtilities);
        },
    ],
};
```

addUtilities 参数是你自定义的工具类的样式对象，遵循 CSS-in-JS 的语法，也支持类似 Sass 的嵌套用法。也可以是样式对象的数组
