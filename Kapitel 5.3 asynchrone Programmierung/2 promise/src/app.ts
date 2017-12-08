import * as fs from 'fs';

function readFileAsync(filename: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFileAsync(filename: string, content: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.writeFile(filename, content, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve('Writing successful');
            }
        });
    });
}

function unlinkFileAsync(filename: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.unlink(filename, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve('Deleting successful');
            }
        });
    });
}

// read single file
let p = readFileAsync('content1.txt');
p.then(
    result => { // onFulfilled-Callback
        console.log(result);
    },
    error => { // onRejected-Callback
        console.log(error);
    }
);

// read two files, write their content into one and delete it
let content1: string;
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