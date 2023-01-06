const os = require('os');

const usr = os.userInfo();
const platform = os.platform();
const rel = os.release();
const cpu = os.cpus();
const dir = __dirname;
const file = __filename;

console.log(`
    ${usr}
    ${platform}
    ${rel}
    ${cpu}
    ${dir}
    ${file}
`);
