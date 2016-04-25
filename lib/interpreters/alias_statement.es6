/*
 * Detect and interpret a statement about an alias for a roman numeral.
 */
import * as constants from '../constants.es6';

const PATTERN = new RegExp(
  `^([a-zA-Z]+) is ([${Object.keys(constants.ROMAN_SYMBOLS).join('')}])$`
);

const AliasStatement = {
  match: (line) => line.match(PATTERN),

  /*
   * Unpack the matches from an alias statement and save the alias.
   * Example: matches=['...', 'glob', 'I']
   * Result: aliases={'glob': 'I'}
   */
  interpret: (matches, aliases) => {
    let alias = matches[1];
    let roman_symbol = matches[2];
    aliases[alias] = roman_symbol;
  }
};

export default AliasStatement;
