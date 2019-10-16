import { createApp } from './app.js';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, rootData, App } = createApp()
        const components = App.components
        console.log(components, '************')
        const asyncDataPromiseFns = []
        Object.values(components).forEach(component => {
            if (component.asyncData) {
                asyncDataPromiseFns.push(component.asyncData())
            }
        });

        Promise.all(asyncDataPromiseFns).then(result => {
            context.state = result
            resolve(app)
        }, reject)
    })
}