import * as constants from './constants.es6';
import parseRoman from './parse_roman.es6';

// Used for RegExp matching
const ROMAN_NUMERALS = Object.keys(constants.ROMAN_SYMBOLS).join('');
const ROMAN_PATTERN = new RegExp(`^[${ROMAN_NUMERALS}$]+$`);

/*
 * Replace any aliases for roman numerals and remove whitespace in between.
 * Turns 'glob prok' into 'IV' if those two aliases were defined.
 * Returns false if an unknown alias was used.
 */
function replaceAliases(str, aliases) {
  let known_aliases = new RegExp(`(${Object.keys(aliases).join('|')})`, 'g');
  let is_valid = true;

  str = str.replace(known_aliases, (alias) => {
    let alias_found = aliases[alias];
    if (alias_found) {
      return alias_found;
    } else {
      is_valid = false;
    }
  });
  
  return (is_valid) ? str : false;
}

/*
 * Parse a string describing a positive intergalactic number.
 * str can contain aliases, roman numerals, or anything else that Number() can
 * interpret.
 *
 * Returns NaN for invalid expressions.
 */
export default function parseIntergalacticNumber(str, aliases) {
  // amount: blarg aliases: { blarg: 'D' }
  
  // Replace known aliases if any given
  if (Object.keys(aliases).length) {
    str = replaceAliases(str, aliases);
  }
  
  if (str === false) {
    // Handle unknown aliases
    return NaN;
  } else {
    // Remove whitespaces
    str = str.replace(/\s/g, '');

    // Test if str only contains roman numerals and convert them or interpret
    // str as any other Number.
    if (ROMAN_PATTERN.test(str)) {
      return parseRoman(str);
    } else {
      // Avoid 0 or negative numbers
      let number = Number(str);
      return (number > 0) ? number : NaN;
    }
  }
}
