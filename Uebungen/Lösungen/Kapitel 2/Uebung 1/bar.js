let person = require('./person');

function change() { 
  person.alter = 42;
}

module.exports = change;