const Vue = require('vue')
const Koa = require('koa');
const Router = require('koa-router');
const renderer = require('vue-server-renderer').createRenderer()

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
    if (err) {
      ctx.status(500).end('Internal Server Error')
      return
    }
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(8080, () => {
  console.log('listen 8080')
})