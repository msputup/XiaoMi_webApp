### Todo List

- components/home/gallery a标签需要添加点击事件
- img lazy-load
- listMerga 应该还可以修改

### 小米nav_tabs点击切换
小米所有的content内容都放在了一个json里。

然后通过vue组件来判断传递过来的组件类型。-> v-if/v-else-if/v-else

content的style大多数也来自于组件。除了部分固定style。

json的style数值都是px写的。不过因为适配用的vw，然后postcss没找到适配dom上的class的方法，所以需要手动计算

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
