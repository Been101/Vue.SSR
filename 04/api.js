const items = ['study', 'play']
export function fetchItem(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      items[id] ? resolve(items[id]) : reject('invalid id')
    }, 500)
  })
}