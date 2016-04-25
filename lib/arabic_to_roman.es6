import * as constants from './constants.es6';

function isPositiveInteger(num) {
  let int = parseInt(num);
  return int === num && int > 0;
}

// Single symbols and subtractions in descending order.
const ROMAN = [
  'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'
];

// Decimal counterparts of ROMAN. 
const DECIMAL = [
  1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
];

/*
 * Convert an arabic numeral to a roman number as a string.
 * Returns NaN if number is not a positive integer within the range of roman
 * numbers (1- 3999) (as defined in the scope of the assignment).
 */
export default function arabicToRoman(number) {
  if (!isPositiveInteger(number) || number > constants.ROMAN_MAX) return NaN;
  
  let result = [];
  ROMAN.forEach((roman_expr, index) => {
    let dec = DECIMAL[index];
    while (number >= dec) {  
      number -= dec; 
      result.push(roman_expr); 
    }
  });
  return result.join(''); 
}
