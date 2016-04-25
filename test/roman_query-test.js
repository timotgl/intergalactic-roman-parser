require('babel-register');
var should = require('should');
var RomanQuery = require('../lib/interpreters/roman_query.es6').default;

describe('RomanQuery', function() {
  describe('match', function () {
    it('detects a valid query', function() {
      var matches = RomanQuery.match('how much is garbl garbl ?');
      matches.should.be.an.Array();
      should(matches[1]).be.equal('garbl garbl');
    });
    it('rejects an invalid query', function() {
      var matches = RomanQuery.match('how much would garbl be in Gold ?');
      should(matches).be.Null();
    });
  });

  describe('interpret', function() {
    it('understands a valid query', function() {
      var matches = ['', 'blarg blurg'];
      var aliases = {'blarg': 'C', 'blurg': 'X'};
      var answer = RomanQuery.interpret(matches, aliases);
      should(answer).be.equal('blarg blurg is 110');
    });
    
    it('handles an unknown alias', function() {
      var matches = ['', 'blubb'];
      var answer = RomanQuery.interpret(matches, {});
      should(answer).be.equal('I can\'t convert blubb');
    });

    it('handles an invalid roman number', function() {
      var matches = ['', 'blubb bli bla'];
      var aliases = {'blubb': 'I', 'bli': 'V', 'bla': 'X'}
      var answer = RomanQuery.interpret(matches, aliases);
      should(answer).be.equal('I can\'t convert blubb bli bla');
    });
  });
});
