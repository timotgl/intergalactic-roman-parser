/*
 * Detect and interpret a query about resource prices.
 */
import * as constants from '../constants.es6';
import parseIntergalacticNumber from '../parse_intergalactic.es6';

const PATTERN = new RegExp(
  `^how many Credits is (.+) (${constants.RESOURCES.join('|')}) \\?$`
);

function isKnownResource(str) {
  let known_resources = new Set(constants.RESOURCES);
  return known_resources.has(str);
}

const PriceQuery = {
  match: (line) => line.match(PATTERN),

  /*
   * Unpack the matches from a query about resource prices in roman numerals.
   * The number to convert might be expressed in previously defined aliases.
   *
   * Example:
   * matches=['...', 'glob glob', 'Silver']
   * aliases={'glob': I}
   * prices={'Silver': 17}
   *
   * Answer: 'glob glob Silver is 34 Credits' (because II*17 = 2*17 = 34).
   */
  interpret: (matches, aliases, prices) => {
    let amount = matches[1];
    let resource = matches[2];

    // Handle unknown resources and missing prices
    if (isKnownResource(resource)) {
      if (!prices.hasOwnProperty(resource)) {
        return `I don\'t know the price of ${resource}`;
      }
    } else {
      return `I don\'t trade ${resource}`;
    }
    
    // Handle invalid amount
    let amount_converted = parseIntergalacticNumber(amount, aliases);
    if (isNaN(amount_converted)) {
      return `I can't convert ${amount}`;
    }
  
    let price = amount_converted * prices[resource];
    return `${amount} ${resource} is ${price} Credits`;
  }
};

export default PriceQuery;
