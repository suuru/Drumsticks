//STRINGS METHODS
// JavaScript provides various built-in methods to manipulate and work with strings. Here are some commonly used string methods with examples:

//.at() method
// The at() method takes an integer value and returns a new string containing the character at the specified index.
// It supports negative integers, which count back from the last string character.

let str = 'Hello';
str.at(0);          // 'H' (first character)
str.at(1);          // 'e'
str.at(-1);         // 'o' (last character)
str.at(-2);         // 'l' (second from end)

console.log(str.at(1));  // Output: 'e'

//.charAt() method
// The charAt() method returns the character at a specified index in a string.
str.charAt(0);      // 'H'
str.charAt(4);      // 'o'
str.charAt(10);     // '' (empty string if out of bounds)

console.log(str.charAt(0)); // Output: 'H'

//.fromCharCode()
// Creates a string from character codes (Unicode numbers).
String.fromCharCode(72, 101, 108, 108, 111);  // 'Hello'
String.fromCharCode(65);                       // 'A'
String.fromCharCode(97);                       // 'a'

console.log(String.fromCharCode(72, 101, 108, 108, 111)); // Output: 'Hello'

//.charCodeAt()
// Gets the Unicode number of a character at a position.

str.charCodeAt(0);  // 72 (code for 'H')
str.charCodeAt(1);  // 101 (code for 'e')
'A'.charCodeAt(0);  // 65

console.log(str.charCodeAt(0)); // Output: 72

//.concat() method
// The concat() method concatenates (joins) two or more strings and returns a new string.
//Joins strings together (rarely used—usually use + instead).
let str1 = 'Hello, ';
let str2 = 'World!';
let result = str1.concat(str2); // 'Hello, World!'

console.log(str1 + str2); // Output: 'Hello, World!'

//.endsWith() method
// The endsWith() method checks if a string ends with a specified substring and returns true or false.
//Checks if a string ends with specific characters.
let phrase = 'Hello, World!';
phrase.endsWith('World!'); // true
phrase.endsWith('Hello');   // false

console.log(phrase.endsWith('Hello')); // Output: false

//.includes() method
// The includes() method checks if a string contains a specified substring and returns true or false.
//Checks if a string contains specific characters.
phrase.includes('lo, Wo'); // true
phrase.includes('world');   // false (case-sensitive)

console.log(phrase.includes('lo, Wo')); // Output: true
console.log(phrase.includes('llo')); // Output: true

// .indexOf() method
// The indexOf() method returns the index of the first occurrence of a specified substring within a string.
// If the substring is not found, it returns -1.
phrase.indexOf('World'); // 7
phrase.indexOf('Hello'); // 0
phrase.indexOf('JavaScript'); // -1
console.log(phrase.indexOf('World')); // Output: 7

//.lastIndexOf() method
//Finds the last position of a substring.
phrase.lastIndexOf('o');           //  8(last 'o')
phrase.lastIndexOf('l');           // 10 (last 'l')
phrase.lastIndexOf('Bye');         // -1 (not found)

console.log(phrase.lastIndexOf('l')); // Output: 10

// .match()
// Finds matches using a pattern (regular expression).
let text = 'My number is 123 and 456';
text.match(/\d+/);              // ['123'] (first number)
console.log(text.match(/\d+/)); // Output: ['123']

let email = 'contact@example.com';
email.match(/@/); 
console.log(email.match(/@/)); // Output: ['@']

//.matchAll()
// Finds all matches with details (returns an iterator).
let test = 'test1 and test2';
let matches = test.matchAll(/test(\d)/g);

for (let match of matches) {
    console.log(match[0]);      // 'test1', then 'test2'
    console.log(match[1]);      // '1', then '2'
}

//.normalize() 
//Normalizes Unicode characters (useful for comparing accented characters).
let name1 = 'Café'; // 'é' as a single character
let name2 = 'Cafe\u0301'; // 'e' + combining acute accent
name1 === name2; // false
name1.normalize() === name2.normalize(); // true
console.log(name1.normalize() === name2.normalize()); // Output: true

// .padEnd()
// Adds characters to the end until the string reaches a certain length.
let pes = 'Hi';
pes.padEnd(5);                  // 'Hi   ' (adds spaces)
pes.padEnd(5, '.');             // 'Hi...'

let price = '50';
price.padEnd(5, '0');          // '50000' (adds '0's)
console.log(price.padEnd(5, '0')); // Output: '50000'
console.log(pes.padEnd(5, '.')); // Output: 'Hi...'



//..padStart()
//Adds characters to the beginning until the string reaches a certain length.
pes.padStart(5);                // '   Hi' (adds spaces)
pes.padStart(5, '*');           // '***Hi'

let num = '7';
pes.padStart(3, '0');           // '007'
console.log(num.padStart(3, '0')); // Output: '007'
console.log(str.padStart(5, '*')); // Output: '***Hi'

//.repeat()
//Repeats the string a specified number of times.
let laugh = 'ha';
laugh.repeat(3);                // 'hahaha'
laugh.repeat(0);                // '' (empty string)
console.log(laugh.repeat(3)); // Output: 'hahaha'

//replace()
//Replaces part of a string with another string.
let greeting = 'Hello, World!';
greeting.replace('World', 'JavaScript'); // 'Hello, JavaScript!'
console.log(greeting.replace('World', 'JavaScript')); // Output: 'Hello, JavaScript!'

//replaceAll()  
//Replaces all occurrences of a substring with another string.
let text2 = 'cat bat cat rat';
text2.replaceAll('cat', 'dog'); // 'dog bat dog rat'
console.log(text2.replaceAll('cat', 'dog')); // Output: 'dog bat dog rat'

//.search()
//Searches for a match using a regular expression and returns the index.
let poem = 'Roses are red, violets are blue.';
poem.search(/violets/); // 16       
console.log(poem.search(/violets/)); // Output: 16

//.slice() method
//Extracts a section of a string and returns it as a new string.
let message = 'Hello, World!';
message.slice(0, 5);        // 'Hello'
message.slice(7);          // 'World!'
message.slice(-6);         // 'World!'      
console.log(message.slice(0, 5)); // Output: 'Hello'

//.split() method
//Splits a string into an array of substrings based on a specified separator.
let fruits = 'apple,banana,cherry';
fruits.split(','); // ['apple', 'banana', 'cherry']
console.log(fruits.split(',')); // Output: ['apple', 'banana', 'cherry']

//.startsWith()
//Checks if a string starts with specific characters.
message.startsWith('Hello'); // true
message.startsWith('World'); // false
console.log(message.startsWith('Hello')); // Output: true

//.substr() method
//Extracts a substring from a string, starting at a specified index for a specified length.
message.substr(7, 5);      // 'World'
message.substr(0, 5);      // 'Hello'
console.log(message.substr(7, 5)); // Output: 'World'   

//.toLowerCase() method
//Converts a string to lowercase letters.
let mixedCase = 'HeLLo WoRLd';
mixedCase.toLowerCase(); // 'hello world'
console.log(mixedCase.toLowerCase()); // Output: 'hello world'  

//.toUpperCase() method
//Converts a string to uppercase letters.
mixedCase.toUpperCase(); // 'HELLO WORLD'
console.log(mixedCase.toUpperCase()); // Output: 'HELLO WORLD'

//.trim() method
//Removes whitespace from both ends of a string.
let spaced = '   Hello World!   ';
spaced.trim(); // 'Hello World!'
console.log(spaced.trim()); // Output: 'Hello World!'

//.trimStart() method
//Removes whitespace from the beginning of a string.
spaced.trimStart(); // 'Hello World!   '
console.log(spaced.trimStart()); // Output: 'Hello World!   '

//.trimEnd() method
//Removes whitespace from the end of a string.
spaced.trimEnd(); // '   Hello World!'
console.log(spaced.trimEnd()); // Output: '   Hello World!'     

//.localeCompare()
//Compares two strings alphabetically (language-aware).
'a'.localeCompare('b');         // -1 (a comes before b)
'b'.localeCompare('a');         // 1 (b comes after a)
'a'.localeCompare('a');         // 0 (they're equal)

// Useful for sorting:
let names = ['Charlie', 'Alice', 'Bob'];
names.sort((a, b) => a.localeCompare(b));
// ['Alice', 'Bob', 'Charlie']
console.log(names); // Output: ['Alice', 'Bob', 'Charlie']
