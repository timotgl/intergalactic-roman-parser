require('babel-register');
var should = require('should');
var parseIntergalacticNumber = require('../lib/parse_intergalactic.es6').default;

describe('parseIntergalacticNumber', function() {
  it('replaces aliases for roman numerals', function() {
    var aliases = {'blub': 'X'};
    should(parseIntergalacticNumber('blub', aliases)).be.equal(10);
    
    // Can we mix aliases and roman numerals?
    should(parseIntergalacticNumber('M blub I', aliases)).be.equal(1011);
  });
  
  it('parses roman numerals', function() {
    should(parseIntergalacticNumber('CX', {})).be.equal(110);
  });

  it('parses other numerical expressions', function() {
    should(parseIntergalacticNumber('123', {})).be.equal(123);
    should(parseIntergalacticNumber('.5', {})).be.equal(0.5);
  });
  
  it('returns NaN for negative numbers or zero', function() {
    should(parseIntergalacticNumber('-5', {})).be.NaN();
    should(parseIntergalacticNumber('0', {})).be.NaN();
  });
  
  it('returns NaN for unknown aliases', function() {
    should(parseIntergalacticNumber('whoami', {})).be.NaN();
  });
  
  it('returns NaN for invalid roman numbers', function() {
    should(parseIntergalacticNumber('XXXXX', {})).be.NaN();
  });
  
  it('returns NaN for other non-numerical expressions', function() {
    should(parseIntergalacticNumber('test15test', {})).be.NaN();
  });
});
