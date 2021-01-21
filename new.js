var fs = require('fs');
const themes = './themes';
const name = process.argv[2];
const domain = name.includes('-') ? name.split('-')[0] : name;
const split = name.split('-')[1];
const themeName = `${domain} ${split.charAt(0).toUpperCase() + split.slice(1)}`

const file = fs.createWriteStream(`${themes}/${name}.scss`);
const css = fs.readFileSync('./new.scss', { encoding: 'utf8', flag: 'r' });
console.log(css)
file.write('/*! ==UserStyle==\n');
file.write(`@name         ${themeName}\n`);
file.write('@namespace    PhongGuy\n');
file.write('@author       PhongGuy\n');
file.write('@version      1.0.0\n');
file.write('@homepageURL  https://github.com/PhongGuy/themes\n');
file.write(`@updateURL    https://raw.githubusercontent.com/PhongGuy/themes/main/dist/${name}.user.css\n`);
file.write('==/UserStyle== */\n');
file.write(`@-moz-document domain("${domain}") {\n${css}\n}`);
file.close();