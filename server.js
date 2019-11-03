const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const backendApp = new Koa();
const backendRouter = new Router();
const argv = process.argv
const project = argv[2]

if (project !== '01') {
  const bundleJson = require(`./${project}/dist/vue-ssr-server-bundle.json`);

  const vueServerRenderer = require('vue-server-renderer')

  // 配置惰性路由后， bundle 中不包含惰性路由组件的js文件, 会报错，  ?
  const renderer = vueServerRenderer.createBundleRenderer(bundleJson, {
    template: fs.readFileSync(path.resolve(__dirname, `./${project}/dist/index.ssr.html`), 'utf-8')
  });

  // 后端Server
  backendRouter.get('*', async (ctx, next) => {
    // if (ctx.url !== '/favicon.ico') {
    const html = await renderer.renderToString(ctx)

    // 为什么下面用异步的方法就不行， 看koa
    // .then(html => {
    //   console.log(html, '-------------')
    //   ctx.type = 'html'
    //   ctx.status = 200
    //   ctx.body = html
    // })
    // , (err, html) => {

    // })
    // }
    ctx.body = html
  });
}

backendApp.use(serve(path.resolve(__dirname, `./${project}/dist`), { index: false }));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.listen(3000, () => {
  console.log('server render address http://localhost:3000');
});
