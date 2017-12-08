"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
fs.readFile('./content1.txt', 'utf-8', function (err, content1) {
    if (err)
        return console.log(err);
    fs.readFile('./content2.txt', 'utf-8', function (err, content2) {
        if (err)
            return console.log(err);
        var content = content1 + '\n' + content2;
        fs.writeFile('./content.txt', content, 'utf-8', function (err) {
            if (err)
                return console.log(err);
            console.log('done');
        });
    });
});
console.log('started');
