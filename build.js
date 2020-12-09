const fs = require('fs');
const colors = require('colors');
const exec = require('child_process').execSync;
const dist = 'dist';

console.log('Compiling SASS'.magenta);
const SASS = exec('node-sass themes -o dist --output-style compressed', { encoding: 'utf8' });
console.log(SASS.white);

fs.readdir(dist, (e, files) => {
    for (const file of files) {
        const oldPath = `${dist}/${file}`;
        const path = `${dist}/${file.replace('css', 'user.css')}`;
        const themePath = `themes/${file.replace('css', 'scss')}`;

        if (!file.includes('user.css')) {
            console.log(`Checking ${path}`.magenta);
            const themeFile = fs.readFileSync(themePath, { encoding: 'utf8', flag: 'r' });
            const version = themeFile.split(/\r?\n/)[4].split(' ')[6].split('.');

            console.log(`Version: `.yellow, `${version.join('.')}`.cyan);

            console.log('Renaming'.yellow, `${oldPath}`.cyan, '>>'.yellow, `${path}`.cyan);
            fs.renameSync(oldPath, path, (err) => {
                console.log(`${err}`.red);
            });

            // check for comments that are bindings
            console.log('Cleaning file...'.yellow);
            const fileRead = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
            var change = fileRead.replace('/*![[', '/*[[').replace('/*! ==', '/* ==');
            change = change.substring(0, change.lastIndexOf("\n"));
            fs.writeFileSync(path, change);

            console.log('Checking for updates...'.yellow);
            const changes = exec('git status dist --porcelain', { encoding: 'utf8' });
            if (changes.includes(path)) {
                // console.log('Change detected: Updating version number...'.cyan);

                // const oldV = version.join('.');
                // version[2]++;
                // console.log('Version changed'.yellow, `${oldV}`.cyan, '>>'.yellow, `${version.join('.')}`.cyan);

                // const themeChange = themeFile.replace(oldV, version.join('.'));
                // fs.writeFileSync(themePath, themeChange);

                // change = change.replace(oldV, version.join('.'));
                // fs.writeFileSync(path, change);
            }

            console.log('Done\n'.green);
        }
    }
});