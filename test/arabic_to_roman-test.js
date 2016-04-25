require('babel-register');
var should = require('should');
var arabicToRoman = require('../lib/arabic_to_roman.es6').default;

describe('arabicToRoman', function() {
  it('correctly converts 3', function() {
    should(arabicToRoman(3)).be.equal('III');
  });
  
  it('correctly converts 204', function() {
    should(arabicToRoman(204)).be.equal('CCIV');
  });
  
  it('correctly converts 1903', function() {
    should(arabicToRoman(1903)).be.equal('MCMIII');
  });
  
  it('correctly converts 3999', function() {
    should(arabicToRoman(3999)).be.equal('MMMCMXCIX');
  });

  it('rejects numbers outside the range', function() {
    should(arabicToRoman(4000)).be.NaN();
  });
  
  it('rejects invalid input', function() {
    should(arabicToRoman(-1)).be.NaN();
    should(arabicToRoman(-0.5)).be.NaN();
    should(arabicToRoman(0)).be.NaN();
    should(arabicToRoman(1.5)).be.NaN();
    should(arabicToRoman('1')).be.NaN();
    should(arabicToRoman('0x1')).be.NaN();
  });
});
