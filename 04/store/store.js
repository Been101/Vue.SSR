import Vue from 'Vue'
import Vuex from 'Vue'

Vue.use(Vuex)

const fetchBar = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('bar 组件返回 ajax 数据')
    }, 1000)
  })
}

export function createStore() {
  const store = new Vuex.Store({
    state: {
      bar: ''
    },

    mutations: {
      'SET_BAR'(state, data) {
        state.bar = data
      }
    },

    actions: {
      fetchBar({ commit }) {
        return fetchBar().then(data => {
          commit('SET_BAR', data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  })

  return store
}

export default createStore;

typeof window