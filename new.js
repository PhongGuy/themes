var fs = require('fs');
const themes = './themes';
const name = process.argv[2];
const domain = name.includes('-') ? name.split('-')[0] : name;
const split = name.split('-')[1];
const themeName = `${domain} ${split.charAt(0).toUpperCase() + split.slice(1)}`

const file = fs.createWriteStream(`${themes}/${name}.scss`);
file.write('/*! ==UserStyle==\n');
file.write(`@name         ${themeName}\n`);
file.write('@namespace    PhongGuy\n');
file.write('@author       PhongGuy\n');
file.write('@version      1.0.0\n');
file.write('@homepageURL  https://github.com/PhongGuy/css-styles\n');
file.write(`@updateURL    https://raw.githubusercontent.com/PhongGuy/css-styles/main/dist/${name}.user.css\n`);
file.write('==/UserStyle== */\n');
file.write(`@-moz-document domain("${domain}") {\n$backgound: #121212!important;\n$text: rgb(170,170,170)!important;\n $text-highlight: rgb(255,255,255)!important;$popup-background: rgba(33,33,33,.98)!important;\n$popup-hover: rgba(255,255,255,.1)!important;\n}`);
file.close();