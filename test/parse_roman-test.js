require('babel-register');
var should = require('should');
var parseRoman = require('../lib/parse_roman.es6').default;

describe('parseRoman', function() {
  it('rejects repeated unique symbols', function() {
    should(parseRoman('VV')).be.NaN();
    should(parseRoman('LLL')).be.NaN();
    should(parseRoman('DDDD')).be.NaN();
    should(parseRoman('DCD')).be.NaN();
  });
  
  it('rejects too often repeated symbols', function() {
    should(parseRoman('III')).be.equal(3);
    should(parseRoman('IIII')).be.NaN();
  });
  
  it('rejects invalid subtractions', function() {
    should(parseRoman('IV')).be.equal(4);
    should(parseRoman('IM')).be.NaN();
  });
  
  it('rejects repeated subtractions', function() {
    should(parseRoman('XL')).be.equal(40);
    should(parseRoman('XLXL')).be.NaN();
  });
  
  it('rejects numbers followed by greater numbers', function() {
    should(parseRoman('IVX')).be.NaN();
    should(parseRoman('CCCM')).be.NaN();
  });
  
  it('correctly parses MMMCM', function() {
    should(parseRoman('MMMCM')).be.equal(3900);
  });
  
  it('correctly parses symbols repeated four times', function() {
    should(parseRoman('XXXIX')).be.equal(39);
  });
  
  it('correctly parses MMMCMXCIX (3999)', function() {
    should(parseRoman('MMMCMXCIX')).be.equal(3999);
  });

  it('rejects numbers greater than 3999', function() {
    should(parseRoman('MMMM')).be.NaN();
    should(parseRoman('MMMMI')).be.NaN();
  });
});
