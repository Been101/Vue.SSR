const Vue = require('vue')
const Koa = require('koa');
const path = require('path')
const Router = require('koa-router');
const renderer = require('vue-server-renderer').createRenderer()

const template = require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')


const app = new Koa();
const router = new Router();


router.get('*', async (ctx, next) => {
  const app = new Vue({
    data: {
      url: ctx.request.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })



  renderer.renderToString(app, (err, html) => {
    console.log(html) // html 将是注入应用程序内容的完整页面
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      ctx.status(500).end('Internal Server Error')
      return
    }
    ctx.body = template.replace('{injectHere}', html)
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(8080, () => {
  console.log('listen 8080')
})