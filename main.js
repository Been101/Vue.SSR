const { exec } = require('child_process')

const argv = process.argv
const project = argv[2]
const side = argv[3]
const projectMap = {
    '01': 'webpack --config ./01/webpack.config.js',
    'ssr': `webpack --config ./${project}/config/webpack.${side}.config.js`,
}

let cmd
if(project === '01'){
    cmd = projectMap[project]
} else {
    cmd = projectMap['ssr']
}

console.log('building...')
exec(cmd, (err, stdout, stderr) => {
    if(err){
        console.log(err, stderr)
    }else {
        console.log(stdout)
        console.log('build succcess!')
    }
})