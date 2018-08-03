### 使用vw实现移动端适配

- 安装插件
```
npm i postcss-aspect-ratio-mini postcss-cssnext postcss-import postcss-px-to-viewport postcss-url postcss-viewport-units postcss-write-svg cssnano cssnano-preset-advanced -D
```

- 配置.postcssrc.js
```
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      "postcss-aspect-ratio-mini": {},
      "postcss-write-svg": {
          utf8: false
      },
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
          viewportWidth: 375,     // (Number) The width of the viewport.
          viewportHeight: 667,    // (Number) The height of the viewport.
          unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
          viewportUnit: 'vw',     // (String) Expected units.
          selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
          minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
          mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
      },
      "postcss-viewport-units":{},
      "cssnano": {
          preset: "advanced",
          autoprefixer: false,
          "postcss-zindex": false
      }
  }
}
```

- 修改index.html添加viewport-units-buggyfill
```
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
<script>
    window.onload = function () {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
    }
</script>
```

方案来自W3CPlus 参考连接[https://juejin.im/entry/5aa09c3351882555602077ca](https://juejin.im/entry/5aa09c3351882555602077ca)