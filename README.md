# PostCSS Tiger Ria

一个postcss插件，获得原子式的css开发体验，能极大缩减最终css文件的大小。借鉴启发于[tailwindcss]

[tailwindcss]: https://tailwindcss.com/

## 安装

```
npm i -D postcss-tiger-ria
```
依赖于[postcss]，将本插件加入postcss插件列表即可
```diff
// example postcss.config.js
module.exports = {
  plugins: [
+   require('postcss-tiger-ria'),
    require('autoprefixer')
  ]
}
```

[postcss]: https://github.com/postcss/postcss#usage

## 文档

### 配置

默认情况下，会在你的项目根目录寻找名为riacss.config.js的配置文件
```js
// example
module.exports = {
  purge: [],
  separator: ':',
  theme: {
    screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    extend: {
      colors: {
        font: {
          cyan: '#9cdbff',
        },
      },
      screens: {
        xxl: '1400px',
      },
    },
  },
  style: {
    display: {
      hidden: 'none',
      block: 'block',
      'inline-block': 'inline-block',
      inline: 'inline',
      flex: 'flex',
      'inline-flex': 'inline-flex',
    },
    zIndex: (theme) => theme('size.zIndex'),
  },
  variants: {
    color: ['responsive', 'hover'],
  },
  plugins: [],
}
```
purge用于配置如何移除无用的css，用了 [PurgeCSS] 这个工具

[PurgeCSS]: https://purgecss.com/

separator是生成variants（变体）时用的分隔符

variants则是生成变体（形如hover:text-red、md:flex-grow的支持伪类与响应式的类）的配置

theme是生成工具类用到的定制主题，theme的属性的定义会直接覆盖默认配置，如果只是想拓展而不是覆盖则使用extend来配置即可，如上

style是生成工具类的具体定义，style的属性既可以是对象也可以是个方法，方法的参数就是用于获取theme配置的方法，如上。所以可以看出theme是服务于style的

plugins是用于自定义工具类与变体的插件
