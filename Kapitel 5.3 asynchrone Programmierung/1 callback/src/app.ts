import * as fs from 'fs';

fs.readFile('./content1.txt', 'utf-8', (err, content1) => {
    if (err) return console.log(err);
    fs.readFile('./content2.txt', 'utf-8', (err, content2) => {
        if (err) return console.log(err);
        const content = content1 + '\n' + content2;
        fs.writeFile('./content.txt', content, 'utf-8', (err) => {
            if (err) return console.log(err);
            console.log('done');
        });
    });
});
console.log('started');