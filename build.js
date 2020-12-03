var fs = require('fs');
const dist = './dist'

fs.readdir(dist, (e, files) => {
    if (files) {
        for (const file of files) {
            if (!file.includes('user.css')) {
                fs.rename(`${dist}/${file}`, `${dist}/${file.replace('css', 'user.css')}`, (err) => {
                    console.log(err);
                })
            }
        }
    }
});