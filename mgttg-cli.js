// Enable on-the-fly transpiling of ES6 modules to ES5.
require('babel-register');
var IntergalacticTrade = require('./lib/intergalactic_trade.es6').default;
var trade = new IntergalacticTrade();

// Read string data from standard input and parse each line.
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function() {
  var lines = process.stdin.read() || '';
  lines.split('\n').forEach(function(line) {
    trade.parseLine(line.trim());
  });
});
