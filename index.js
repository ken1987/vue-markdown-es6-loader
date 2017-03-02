const path = require('path')
const fs = require('fs')
const hljs = require('highlight.js')
const marked = require('marked')

// 识别 markdown 中标记为 vue 的代码片段
const regVueCode = /`{3,5}\s*vue\s*[\r\n]([\s\S]*?)[\r\n]`{3,5}(?!`)/
const uuid = 'marked' + (+new Date())

function getImportCodeString(url, id) {
  let rq = '\'' + url + '\''
  if (id) {
    rq = id + ' from ' + rq
  }
  return 'import ' + rq
}

module.exports = function markdownES6Loader(source) {
  this.cacheable()

  const callback = this.async()

  const query = Object.assign({}, this.query, {
    prefix: '<div>',
    postfix: '</div>',
    highlightStyle: 'default'
  })

  const resourcePath = this.resourcePath
  const highlightStyle = query.highlightStyle
  const scriptDependencies = []
  let addNum = 1

  // 遍历全部 vue 格式的代码
  const newSource = source.replace(regVueCode, (snippet, _1) => {
    try {
      // 删除开始和结束的空白
      const src = _1.replace(/^\s|\s$/, '')

      const rp = path.resolve(path.dirname(resourcePath), src)
      const code = fs.readFileSync(rp, 'utf-8')
      const tag = uuid + addNum
      addNum += 1

      scriptDependencies.push({
        tag,
        src
      })

      const components = '<' + tag + '></' + tag + '>'
      const newSnippet = '\n```html\n' + code + '\n```'
      return components + newSnippet
    } catch (e) {
      console.error(e)
      return snippet
    }
  })

  // 拼接 script 标签内容
  const scriptContent = scriptDependencies.map(
    item => getImportCodeString(item.src, item.tag)
  )

  scriptContent.push(
    'export default {components:{' + scriptDependencies.map(item => item.tag).join(',') + '}}'
  )

  scriptContent.push(
    getImportCodeString('highlight.js/styles/' + highlightStyle + '.css')
  )

  // 拼接 template 标签内容
  marked(
    newSource,
    Object.assign({}, query.markedOptions, {
      langPrefix: highlightStyle + ' hljs ',
      highlight: code => hljs.highlightAuto(code).value
    }),
    (err, code) => {
      if (err) {
        callback(err)
      } else {
        callback(null,
          '<template>' +
          query.prefix +
          code +
          query.postfix +
          '</template><script>' +
          scriptContent.join(';') +
          '</script>'
        )
      }
    }
  )
}
