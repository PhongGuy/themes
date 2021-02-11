const fs = require('fs');
const colors = require('colors');
const themes = './src/themes';

const name = process.argv[2];
const domain = name.includes('-') ? name.split('-')[0] : name;
const split = name.split('-')[1];
const themeName = `${domain} ${split.charAt(0).toUpperCase() + split.slice(1)}`

console.log(`Adding ${themeName}`.yellow);

const newTheme = fs.readFileSync('./new.scss', { encoding: 'utf8', flag: 'r' })
    .replace('[[DOMAIN]]', domain)
    .replace('[[NAME]]', name)
    .replace('[[THEME]]', themeName);

const file = fs.createWriteStream(`${themes}/${name}.scss`);
file.write(newTheme);
file.close();