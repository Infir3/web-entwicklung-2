"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readFileAsync(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
}
function writeFileAsync(filename, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, content, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve('Writing successful');
            }
        });
    });
}
function unlinkFileAsync(filename) {
    return new Promise((resolve, reject) => {
        fs.unlink(filename, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve('Deleting successful');
            }
        });
    });
}
// read single file
let p = readFileAsync('content1.txt');
p.then(result => {
    console.log(result);
}, error => {
    console.log(error);
});
let content1;
readFileAsync('content1.txt')
    .then((result) => {
    content1 = result;
    return readFileAsync('content2.txt');
})
    .then((result) => {
    const content = content1 + '\n' + result;
    return writeFileAsync('content.txt', content); // analog zu readFileAsync
})
    .then(() => {
    return unlinkFileAsync('content.txt');
})
    .then((result) => {
    console.log(result);
})
    .catch(error => {
    console.log(error);
});
console.log('started');
