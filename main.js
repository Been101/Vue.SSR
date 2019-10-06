const project = process.argv[2]
const { exec } = require('child_process')
console.log('building...')
exec(`webpack --config ./${project}/webpack.config.js`, (err, stdout, stderr) => {
    if(!err) {
        console.log(stdout)
        console.log('build succcess!')
    }
})