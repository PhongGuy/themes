var fs = require('fs');
const themes = './themes';
const name = process.argv[2];
const domain = name.includes('-') ? name.split('-')[0] : name;

const file = fs.createWriteStream(`${themes}/${name}.scss`);
file.write('/*! ==UserStyle==\n');
file.write(`@name         ${name.replace('-', ' ')}\n`);
file.write('@namespace    PhongGuy\n');
file.write('@author       PhongGuy\n');
file.write('@version      1.1.0\n');
file.write('@homepageURL  https://github.com/PhongGuy/css-styles\n');
file.write(`@updateURL    https://raw.githubusercontent.com/PhongGuy/css-styles/main/dist/${name}.user.css\n`);
file.write('==/UserStyle== */\n');
file.write(`@-moz-document domain("${domain}") {\n\n}`);
file.close();