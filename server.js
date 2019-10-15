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

const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
  template: fs.readFileSync(path.resolve(__dirname, `./${project}/dist/index.ssr.html`), 'utf-8')
});

// 后端Server
backendRouter.get('/index', (ctx, next) => {
  // 这里用 renderToString 的 promise 返回的 html 有问题，没有样式
  renderer.renderToString((err, html) => {
    if (err) {
      console.error(err);
      ctx.status = 500;
      ctx.body = 'Server internal error';
    } else {
      console.log(html);
      ctx.status = 200;
      ctx.body = html;
    }
  });
});

backendApp.use(serve(path.resolve(__dirname, `./${project}/dist`)));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.listen(3000, () => {
  console.log('server render address http://localhost:3000');
});
