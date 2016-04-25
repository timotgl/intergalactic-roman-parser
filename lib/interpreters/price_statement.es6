/*
 * Detect and interpret a statement about the price of an intergalactic resource
 * given in roman numerals.
 */
import * as constants from '../constants.es6';
import parseIntergalacticNumber from '../parse_intergalactic.es6';

const PATTERN = new RegExp(
  `^(.+) (${constants.RESOURCES.join('|')}) is ([0-9]+) Credits$`
);

const PriceQuery = {
  match: (line) => line.match(PATTERN),

  /*
   * Unpack the matches from a pricing statement and set the price for one unit.
   * The amount might consist of previously defined aliases for roman numerals.
   * Example: matches=['...', 'glob glob', 'Silver', '34'] aliases={'glob': 'I'}
   * Result: prices={'Silver': 17} (because 34/II = 34/2 = 17)
   */
  interpret: (matches, aliases, prices) => {
    let amount = matches[1];
    let resource = matches[2];
    let price = Number(matches[3]);
    amount = parseIntergalacticNumber(amount, aliases);
    prices[resource] = price/amount;
  }
};

export default PriceQuery;
