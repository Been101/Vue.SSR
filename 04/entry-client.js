import { createApp } from './app.js'

const { app, router } = createApp()

router.onReady(() => {
  // 这里假定 App.vue 模板中根元素具有 `id="app"`
  app.$mount('#app')
})
