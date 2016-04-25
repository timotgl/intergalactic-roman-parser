require('babel-register');
var should = require('should');
var PriceQuery = require('../lib/interpreters/price_query.es6').default;

describe('PriceQuery', function() {
  describe('match', function () {
    it('detects a valid query', function() {
      var matches = PriceQuery.match('how many Credits is blarg Gold ?');
      matches.should.be.an.Array();
      should(matches[1]).be.equal('blarg');
      should(matches[2]).be.equal('Gold');
    });
    it('rejects an invalid query', function() {
      var matches = PriceQuery.match('how many Gold is Silver ?');
      should(matches).be.Null();
    });
  });
  
  describe('interpret', function() {
    it('understands a valid query', function() {
      var matches = ['', 'blarg blurg', 'Gold'];
      var aliases = {'blarg': 'C', 'blurg': 'X'};
      var prices = {'Gold': 20};
      var answer = PriceQuery.interpret(matches, aliases, prices);
      should(answer).be.equal('blarg blurg Gold is 2200 Credits');
    });
    it('handles an invalid amount', function() {
      var matches = ['', 'blubb', 'Gold'];
      var prices = {'Gold': 20};
      var answer = PriceQuery.interpret(matches, {}, prices);
      should(answer).be.equal('I can\'t convert blubb');
    });
    it('handles an unknown resource', function() {
      var matches = ['', 'bla', 'Titanium'];
      var aliases = {'bla': 'I'};
      var prices = {'Gold': 20};
      var answer = PriceQuery.interpret(matches, {}, prices);
      should(answer).be.equal('I don\'t trade Titanium');
    });
    it('handles missing prices', function() {
      var matches = ['', 'bla', 'Gold'];
      var aliases = {'bla': 'I'};
      var answer = PriceQuery.interpret(matches, aliases, {});
      should(answer).be.equal('I don\'t know the price of Gold');
    });
  });
});
