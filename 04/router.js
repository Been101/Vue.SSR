import Vue from 'vue'
import Router from 'vue-router'

const routes = [
  { path: '/foo', component: () => import('./components/Foo.vue') },
  { path: '/bar', component: () => import('./components/Bar.vue') }
]

Vue.use(Router)

export function createRouter() {
  // 创建 router 实例，然后传 `routes` 配置
  // 你还可以传别的配置参数, 不过先这么简单着吧。
  return new Router({
    mode: 'history',
    routes
  })
}
