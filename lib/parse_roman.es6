import * as constants from './constants.es6';

// Symbols than can never be repeated.
const UNIQUES = ['V', 'L', 'D'];

// Symbols that can be repeated up to 3 times.
const REPETITIONS = {I: 3, X: 3, C: 3, M: 3};

// Simplify parsing of unique subtractions, since there's only six of them.
const SUBTRACTIONS = {IV: 4, IX: 9, XL: 40, XC: 90, CD: 400, CM: 900};

// Valid roman numerals without syntax errors have to fulfill these constraints:
// functions that either perform replacements in the input string or return NaN.
const CONSTRAINTS = [replaceSubtractions, replaceUniques, replaceRepetitions];

/*
 * Replace unique symbols with arabic numerals, while ensuring that they don't
 * occur more often than allowed.
 * Example: turns 'D,4' into ',500,4'
 */
function replaceUniques(str, allowed_uniques) {
  let symbols = UNIQUES.join('');
  let pattern = new RegExp(`[${symbols}]`, 'g');
  let is_valid = true;
  
  let replaceMatch = (match) => {
    if (allowed_uniques.has(match)) {
      allowed_uniques.delete(match);
      return `,${constants.ROMAN_SYMBOLS[match]}`;
    } else {
      // Unique symbol was repeated.
      is_valid = false;
      return '';
    }
  };

  str = str.replace(pattern, replaceMatch);
  return (is_valid) ? str : NaN;
}

/*
 * Replace repeatable symbols with arabic numerals, while ensuring that they
 * don't occur more often than allowed.
 * Example: turns 'M,4' into ',1000,4'
 */
function replaceRepetitions(str) {
  let symbols = Object.keys(REPETITIONS).join('');
  let allowed_repetitions = Object.assign({}, REPETITIONS);
  let pattern = new RegExp(`[${symbols}]`, 'g');
  let is_valid = true;
  
  let replaceMatch = (match) => {
    if (allowed_repetitions[match]) {
      allowed_repetitions[match] -= 1;
      return `,${constants.ROMAN_SYMBOLS[match]}`;
    } else {
      // Repeated symbol found but not allowed anymore.
      is_valid = false;
      return '';
    }    
  };

  str = str.replace(pattern, replaceMatch);
  return (is_valid) ? str : NaN;
}

/*
 * Find subtractions like 'IV' and replace them with arabic numerals.
 * Since subtractions can contain the unique symbols ('V', 'L', 'D'),
 * we need to eliminate these once seen. For example, 'VIV' contains 'V' twice.
 * Example: turns 'MIV' into 'M,4'.
 */
function replaceSubtractions(str, allowed_uniques) {
  let subtr_symbols = Object.keys(SUBTRACTIONS);
  let allowed_subtr = new Set(subtr_symbols);
  let pattern = new RegExp(`(${subtr_symbols.join('|')})`, 'g');
  let is_valid = true;
  
  let replaceMatch = (match) => {
    if (allowed_subtr.has(match)) {
      allowed_subtr.delete(match);
      
      // Eliminate single, unique symbols if subtraction contained one.
      let unique = match[1];
      if (allowed_uniques.has(unique)) {
        allowed_uniques.delete(unique);
      }

      return `,${SUBTRACTIONS[match]}`;
    } else {
      // Unique subtraction expression was repeated.
      is_valid = false;
      return '';
    }
  };

  str = str.replace(pattern, replaceMatch);
  return (is_valid) ? str : NaN;
}

/*
 * Parse a string containing roman numerals into a Number primitive.
 * Example: given 'MIV' (1004) we convert in 4 steps:
 * 'MIV' --> 'M,4' --> ',1000,4' --> [1000,4] --> 1004
 */
export default function parseRoman(str) {
  let allowed_uniques = new Set(UNIQUES);
  
  // Apply replacements to str and check all constraints in correct order.
  // Abort parsing as soon as any syntax violation was found.
  let violationFound = CONSTRAINTS.some((replace) => {
    str = replace(str, allowed_uniques);
    return str !== str; // check for NaN
  });
  if (violationFound) return NaN;
  
  // Split string and convert to Array of Numbers.
  let summands = str.slice(1).split(',').map((num_str) => Number(num_str));
  
  // Add all numbers up but produce NaN as soon as the current value is
  // greater than the previous one (syntax violation for roman numerals).
  let sum = (result, curr, idx, arr) => {
    return (result === 0 || curr <= arr[idx - 1]) ? result + curr : NaN;
  };
  return Number(summands.reduce(sum, 0));
}
