/*
 * IntergalacticTrade exposes a parseLine method that delegates further
 * processing to the respective interpreters.
 * 
 * Interpreters either..
 * 1) mutate the state of aliases and prices (statements) or
 * 2) answer questions about roman numerals and prices of resources (queries)
 */
import PriceQuery from './interpreters/price_query.es6';
import RomanQuery from './interpreters/roman_query.es6';
import AliasStatement from './interpreters/alias_statement.es6';
import PriceStatement from './interpreters/price_statement.es6';

const MIN_LINE_LENGTH = 6;
const INVALID_QUERY_MSG = 'I have no idea what you are talking about';
const INTERPRETERS = [PriceQuery, RomanQuery, AliasStatement, PriceStatement];

export default class IntergalacticTrade {
  constructor() {
    // Keep track of defined aliases for roman numeral symbols like "glob is X".
    this.aliases = {};
    
    // Keep track of defined prices for resources like "5 Silver is 10 Credits".
    this.prices = {};
  }

  /*
   * Determine wether a line is..
   *
   * 1) An alias statement for a roman numeral symbol ("glob is X")
   * 2) A pricing statement for intergalactic units ("IX Gold is 5 Credits")
   * 3) A conversion query for
   *    a) roman to arabic numerals
   *    b) prices of intergalactic units (amount expressed in roman numerals)
   * 
   * ..and invoke the respective function for interpretation.
   */
  parseLine(line) {
    // Skip short lines where no pattern would match anyway.
    if (line.length < MIN_LINE_LENGTH) return;
    
    // Examine the line until we find the right interpreter.
    let can_be_interpreted = INTERPRETERS.find((interpreter) => {
      let matches = interpreter.match(line);
      if (matches) {
        let output = interpreter.interpret(matches, this.aliases, this.prices);
        if (output) process.stdout.write(`${output}\n`);
        return true;
      }
    });
    
    if (!can_be_interpreted) {
      process.stdout.write(`${INVALID_QUERY_MSG}\n`);
    }
  }
} 
