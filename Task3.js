//NUMBERS METHODS
// JavaScript provides various built-in methods to work with numbers. Here are some commonly used number methods with examples:

//.Number(str) method
// The Number() method converts a string or other value to a number.
Number('123');      // 123
Number('12.34');        // 12.34
Number('abc');      // NaN (Not a Number)                   
console.log(Number('123')); // Output: 123

//Number(numberString) method
// The Number() method converts a numeric string to a number.
Number('456');      // 456
Number('78.90');    // 78.9
console.log(Number('456')); // Output: 456  

//.isFinite() method
// The isFinite() method checks if a value is a finite number.
//Checks if a number is finite (not infinity, not NaN).
Number.isFinite(123);        // true
Number.isFinite(Infinity); // false
console.log(Number.isFinite(123)); // Output: true

//.isInteger() method
// The isInteger() method checks if a value is an integer.
//Checks if a number is a whole number (no decimals).
Number.isInteger(25);           // true
Number.isInteger(25.0);         // true (same as 25)
Number.isInteger(25.5);         // false (has decimal)
Number.isInteger('25');         // false (it's a string)
Number.isInteger(NaN);          // false
console.log(Number.isInteger(25.5)); // Output: false

//.isNaN() method
// The isNaN() method checks if a value is NaN (Not a Number).
//Checks if a value is NaN (Not a Number).
Number.isNaN(NaN);          // true
Number.isNaN(123);        // false
Number.isNaN('abc');    // false (it's a string)        
console.log(Number.isNaN(NaN)); // Output: true
// Be careful with global isNaN():
isNaN('hello');                 // true (converts first, then checks)
Number.isNaN('hello');          // false (doesn't convert)

//.isSafeInteger() method
// The isSafeInteger() method checks if a value is a safe integer.
//Checks if a number is a safe integer (within the safe range).
Number.isSafeInteger(9007199254740991);  // true (max safe integer)
Number.isSafeInteger(9007199254740992);  // false (exceeds max safe integer)
Number.isSafeInteger(3.14);             // false (not integer)
console.log(Number.isSafeInteger(9007199254740992)); // Output: false

//.parseFloat() method
// The parseFloat() method parses a string and returns a floating point number.
//Parses a string and returns a floating point number.
parseFloat('3.14');        // 3.14
parseFloat('10.5abc');     // 10.5 (stops parsing at first non-numeric character)
parseFloat('abc10.5');     // NaN (no valid number at start)
console.log(parseFloat('10.5abc')); // Output: 10.5

//.parseInt() method
// The parseInt() method parses a string and returns an integer.
//Parses a string and returns an integer.
parseInt('42');            // 42
parseInt('15.99');         // 15 (stops parsing at decimal point)
parseInt('abc42');         // NaN (no valid number at start)
Number.parseInt('123abc');          // 123 (stops at 'a')
Number.parseInt('abc123');          // NaN (starts with letters)

console.log(parseInt('15.99')); // Output: 15

//.toExponential() method
// The toExponential() method converts a number to exponential notation.
//Converts a number to exponential notation.
let num1 = 12345;
num1.toExponential();        // '1.2345e+4'
num1.toExponential(2);       // '1.23e+4' (2 digits after decimal)
console.log(num1.toExponential(2)); // Output: '1.23e+4'

//.toFixed() method
// The toFixed() method formats a number using fixed-point notation.
//Converts a number to a string with a fixed number of decimals.
let num2 = 5.6789;
num2.toFixed(2);             // '5.68' (rounded to 2 decimal places)
num2.toFixed(0);         // '6' (rounded to nearest integer)    
console.log(num2.toFixed(2)); // Output: '5.68'

//.toPrecision() method
// The toPrecision() method formats a number to a specified length.
//Converts a number to a string with a total number of significant digits.
let num3 = 123.456789;
num3.toPrecision(4);         // '123.5' (4 significant digits)
num3.toPrecision(6);         // '123.457' (6 significant digits)
console.log(num3.toPrecision(4)); // Output: '123.5'

//.toString() method
// The toString() method converts a number to a string.
//Converts a number to a string.
let num4 = 100;
num4.toString();      // '100'
console.log(num4.toString()); // Output: '100'

//ValueOf() method
// The valueOf() method returns the primitive value of a number object.
//Returns the primitive value of a number object.
let num5 = new Number(200);
num5.valueOf();       // 200
console.log(num5.valueOf()); // Output: 200


