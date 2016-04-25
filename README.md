# Technical assignment solution by Timo Taglieber
This project uses Node.js and ES6, and I'm assuming an OS X/Unix environment.

## How to run

* Please use a recent enough Node.js version. This code was tested with `v5.7.1`.
* Do `npm install` and then invoke the CLI with `npm run-script demo`. It uses the test input from the assignment.
* Run tests with `npm test`.

## Design & Approach
The solution is a command line interface that accepts lines of text. In terms of OOP, there is only one class `IntergalacticTrade` which encapsulates a trade conversation involving statements and questions. This class exposes a `parseLine` method which classifies the input as either a statement or a question.

`IntergalacticTrade` maintains the state of *aliases* and *prices* mentioned during the exchange, since these can be referred to in subsequent statements and questions. It further delegates processing to *interpreter modules*.

Interpreter modules expose the methods `match` and `interpret`. `match` is used to determine wether or not a given interpreter is the right one to interpret a line. `interpret` then modifies the state of `aliases` and `prices` and can also output an answer to a question.

* Alias statement: single roman numeral symbols might be aliased and referred to later
* Price statement: sets the price of an intergalactic resource, but possibly expressed in roman numerals or aliases thereof.
* Price query: calculats the price of a given amount of a resource, with the same optional number conversion.
* Roman query: simply converts roman numerals (or aliases thereof) into arabic ones.

Most of the heavy lifting happens in `parse_roman.es6`, where I chose regular expression to transform the input string until it contains only decimal numbers. Every constraint (unique symbols, repeated symbols, subtractions) is expressed in a single `replace...` method. Calling these methods in the right order enforces each constraint to be obeyed. Once this is done, the only remaining constraint to check is that each number is followed by an equal or smaller number.

# Notes & Limitations

* The assignment states that the roman numeral `M` can't be repeated more than three times as a single symbol. This results in a maximum of 3999. There are ways to work with higher roman numbers, but for the scope of this assignment I assumed this limit to be true.
* It wasn't really clear to me where a conversion from arabic back to roman numerals would happen from examining the test input. I included such a method anyway in `arabic_to_roman.es6` and provided test cases for it.
* I assumed that Silver, Gold, and Iron are the only valid units/resources during the trade conversation. It would however be easy to allow a `PriceStatement` to set the price for any given resource.
