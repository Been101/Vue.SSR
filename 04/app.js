import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store/store';

export function createApp() {
    const rootData = createStore()
    const app = new Vue({
        data() {
            return rootData
        },
        render: h => h(App)
    })

    return { app, rootData, App }
}