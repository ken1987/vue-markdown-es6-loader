# vue-markdown-es6-loader

Converting Markdown to Vue single-file component loader for Webpack.

## notes

* node >= 6.0.0
* npm >= 3.0.0
* webpack >= 2.0.0
* output es6 module

## install

``` shell
npm i vue-markdown-es6-loader
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
           js: 'babel-loader' // output es6 module
        }
      }, {
        loader: 'vue-markdown-es6-loader',
        options: {
          prefix: '<div>',
          postfix: '</div>',
          highlightStyle: 'default'
        }
      }]
    }]
  }
}
```

## options

### prefix

  * Type: string
  * Default: `<div>`
  * Details:

    Element tag of output start.

    > Vue warn: Component template should contain exactly one root element


### postfix

  * Type: string
  * Default: `</div>`
  * Details:

    Element tag of output end.

    > Vue warn: Component template should contain exactly one root element

### highlightStyle

  * Type: string
  * Default: `default`
  * Optional: refer to [style filename][2]
  * Details:

    [`highlight.js`][1] style.

* markedOptions

  * Type: string
  * Optional: refer to [marked options][3]
  * Details:

    A markdown parser options.


## usage

*  use `.vue` in markdown

  * set code type to  `vue`
  * write path into code area
```
  \``` vue
    ./code.vue
  \```
```

* reslute

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

## TODO

* Verify `prefix` and `postfix` are closed
* asynchronous read file

[1]: https://github.com/isagalaev/highlight.js
[2]: https://github.com/isagalaev/highlight.js/tree/master/src/styles
[3]: https://github.com/chjj/marked
