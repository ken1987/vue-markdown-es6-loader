# vue-markdown-es6-loader

Converting Markdown to Vue single-file component loader for Webpack.

## notes

* node >= 6.0.0
* npm >= 3.0.0
* webpack >= 2.0.0

## install

``` shell
npm i vue-source-loader
```

## webpack 2.x config

```js
{
  module: {
    rules: [{
      test: /\.vue\.md$/,
      use: [{
        loader: 'vue-loader',
        options: {
           js: 'babel-loader'
        }
      }, {
        loader: 'vue-markdown-es6-loader',
        options: {
          prefix: '<div>',  // 开始的开头
          postfix: '</div>',// 结束的代码
          highlightStyle: 'default' // 代码高亮
        }
      }]
    }]
  }
}
```

## options 

* prefix

  代码开始处

* postfix

  代码结尾处

* highlightStyle

  代码高亮可选样式，依赖 [`highlight.js`][1]
  默认值：`default`，可选值： `highlight.js` [样式][2]

* markedOptions

  配置 markdown 生成的 `html`

  参考 marked [配置][3]

## usage

* markdown 中引用 .vue 模块

  在代码区块中设置代码类型 `vue`

  在代码区块内设置模块路径

``````
``` vue
  ./code.vue
``````
```
``````

* 输入结果

``` html
<template>
    <div>
        <vmd14884628711531></vmd14884628711531>
        <pre><code class="hljs default">...</code></pre>
    </div>
</template>
<script>
    import vmd14884628711531 from './code.vue';
    export default {
      components:{
        vmd14884628711531
      }
    };
    import 'highlight.js/styles/default.css'
</script>
```

[1]:https://github.com/isagalaev/highlight.js
[2]:https://github.com/isagalaev/highlight.js/tree/master/src/styles
[3]:https://github.com/chjj/marked
