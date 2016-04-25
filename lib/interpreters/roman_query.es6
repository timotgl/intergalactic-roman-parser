/*
 * Detect and interpret a query about roman numeral conversion (to arabic).
 * The exposed object provides the methods .match() and .interpret().
 */
import parseIntergalacticNumber from '../parse_intergalactic.es6';

const PATTERN = new RegExp(`^how much is (.+) \\?$`);
const RomanQuery = {
  match: (line) => line.match(PATTERN),

  /*
   * Unpack the matches from a query about converting roman numerals.
   * The number to convert might be expressed in previously defined aliases.
   * Example: matches=['...', 'glob glob'] aliases={'glob': I}
   * Answer: 'glob glob is 2'.
   */
  interpret: (matches, aliases) => {
    let number = matches[1];
    let answer = parseIntergalacticNumber(number, aliases);
    if (isNaN(answer)) {
      return `I can't convert ${number}`;
    } else {
      return `${number} is ${answer}`;
    }
  }
};

export default RomanQuery;
