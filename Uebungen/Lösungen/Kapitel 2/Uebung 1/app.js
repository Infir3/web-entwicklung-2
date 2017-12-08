let person = require('./person');

let foo = require('./foo');
let bar = require('./bar');

foo();
bar();

console.log('Name: ' + person.name + ', Alter: ' + person.alter);
