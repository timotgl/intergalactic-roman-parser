require('babel-register');
var should = require('should');
var IntergalacticTrade = require('../lib/intergalactic_trade.es6').default;

describe('IntergalacticTrade', function() {
  beforeEach(function() {
    this.trade = new IntergalacticTrade();
  });

  it('exposes a parseLine method', function() {
    this.trade.parseLine.should.be.a.Function();
  });

  it('processes alias statements', function() {
    this.trade.aliases.should.be.an.Object();
    this.trade.parseLine('blarg is D');
    this.trade.aliases.should.have.property('blarg', 'D');
    this.trade.parseLine('blarg is C');
    this.trade.aliases.should.have.property('blarg', 'C');
  });
  
  it('processes price statements', function() {
    this.trade.prices.should.be.an.Object();

    this.trade.parseLine('blarg is D');
    this.trade.parseLine('blarg Silver is 1000 Credits');
    this.trade.prices.should.have.property('Silver', 2);

    this.trade.parseLine('uno is I');
    this.trade.parseLine('uno uno Gold is 1 Credits');
    this.trade.prices.should.have.property('Gold', 0.5);
  });
});
