import createApp from './app.js';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, store, App } = createApp()
        const components = App.components
        console.log(components, '************')
        const asyncDataPromiseFns = []

        Object.values(components).forEach(component => {
            if (component.asyncData) {
                asyncDataPromiseFns.push(component.asyncData(store))
            }
        })

        Promise.all(asyncDataPromiseFns).then(() => {
            context.state = store.state
            resolve(app)
        }, reject)
    })
}