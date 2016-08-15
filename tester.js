var supply = require('@dms/supply');
var jsonFile = require('jsonfile');

var contents = jsonFile.readFileSync('./tests/test_data.json');
console.dir(contents);