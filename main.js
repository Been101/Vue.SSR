const { exec } = require('child_process')

const argv = process.argv
const project = argv[2]
const projectMap = {
    '01': 'webpack --config ./01/webpack.config.js',
    'ssr': `webpack --config ./${project}/config/webpack.client.config.js`,
}

if (project === '01') {
    const cmd = projectMap[project]
    execCmd(cmd)
} else {
    const clientCmd = `webpack --config ./${project}/config/webpack.client.config.js`
    const serverCmd = `webpack --config ./${project}/config/webpack.server.config.js`
    execCmd(clientCmd)
    execCmd(serverCmd)
}

function execCmd(cmd) {
    console.log(`building... ${cmd}`)
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err, stderr)
        } else {
            console.log(stdout)
            console.log(`build ${cmd} succcess!`)
        }
    })

}