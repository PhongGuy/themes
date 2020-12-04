var fs = require('fs');
const dist = './dist'

fs.readdir(dist, (e, files) => {
    for (const file of files) {
        const path = `${dist}/${file}`;
        console.log("\x1b[36m", 'Checking ', path);

        // check for comments that are bindings
        const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
        if (data.includes('/*![[') || data.includes('/*! ==')) {
            console.log("\x1b[33m", 'Fixing bindings...')
            var replaced = data.replace('/*![[', '/*[[').replace('/*! ==', '/* ==');
            // after replacing sendt it back
            fs.writeFileSync(path, replaced);
        }

        // add user to make it better?
        if (!file.includes('user.css')) {
            console.log('\x1b[33m', 'Adding user...')
            fs.renameSync(path, `${dist}/${file.replace('css', 'user.css')}`, (err) => {
                console.log(err);
            });
        }

        console.log("\x1b[32m", 'Success')
    }
});