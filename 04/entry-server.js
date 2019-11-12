import { createApp } from './app.js';

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    if (context.url.indexOf('.') === -1) {
      router.push(context.url)
    }
    // 设置服务器端 router 的位置

    console.log(context.url, '******')
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        router.push('/foo')   // 可以加个默认页面， 或者是404页面
        // return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData(
            {
              store,
              route: router.currentRoute
            })
        }
      })).then(() => {
        // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。而在客户端，在挂载到应用程序之前，store 就应该获取到状态
        context.state = store.state
        // Promise 应该 resolve 应用程序实例，以便它可以渲染
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}