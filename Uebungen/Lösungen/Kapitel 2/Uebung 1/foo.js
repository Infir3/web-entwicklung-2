let person = require('./person');

function change() { 
  person.name = 'John Doe';
}

module.exports = change;