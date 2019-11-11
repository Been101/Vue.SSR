import { createApp } from './app.js'
const { app, router, store } = createApp()

router.onReady(() => {

  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  // 这里假定 App.vue 模板中根元素具有 `id="app"`
  app.$mount('#app')
})

