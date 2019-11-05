import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 一个可以返回 Promise 的 API
import { fetchItem } from './api'

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {}
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    },
    actions: {
      fetchItem({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    }
  })
}