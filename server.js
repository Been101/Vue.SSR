const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const backendApp = new Koa();
const backendRouter = new Router();
const argv = process.argv
const project = argv[2]

const bundle = fs.readFileSync(path.resolve(__dirname, `./${project}/dist/server.bundle.js`), 'utf-8');

const vueServerRenderer = require('vue-server-renderer')

const renderer = vueServerRenderer.createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, `./${project}/dist/index.ssr.html`), 'utf-8')
});
// 后端Server
backendRouter.get('/index', async (ctx, next) => {
  // 这里用 renderToString 的 promise 返回的 html 有问题，没有样式
  const html = await new Promise((resolve, reject) => {

    renderer.renderToString((err, htmlStr) => {
      if (err) {
        console.log('err--', err)
        reject(err)
      } else {
        resolve(htmlStr)
      }
    });
  })
  console.log(html, '-------------')
  ctx.type = 'html'
  ctx.status = 200
  ctx.body = html
});

backendApp.use(serve(path.resolve(__dirname, `./${project}/dist`), { index: false }));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.listen(3000, () => {
  console.log('server render address http://localhost:3000');
});
