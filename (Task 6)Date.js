//DATE METHODS
//Date.now()
//Returns the current timestamp (milliseconds since January 1, 1970)

Date.now();     // 1732454400000 (current time in ms)

// Useful for measuring time:
let start = Date.now();
// ... some code runs ...
let end = Date.now();
let duration = end - start;  // Time elapsed in milliseconds
console.log(Date.now()); // Output: (current timestamp in milliseconds)

//Date.parse() method
//Parses a date string and returns the number of milliseconds since January 1, 1970.
Date.parse('2023-01-01');    // 1672531200000 (timestamp for Jan 1, 2023)
Date.parse('December 17, 1995 03:24:00'); // 819170640000 (timestamp for Dec 17, 1995)
console.log(Date.parse('2023-01-01')); // Output: 1672531200000

//Date.UTC() method
//Creates a UTC timestamp from date parts (year, month, day, etc.).
// Date.UTC(year, month, day, hours, minutes, seconds, ms)
Date.UTC(2024, 10, 24);             // 1732406400000
// Note: Months are 0-indexed (0 = January, 10 = November)

Date.UTC(2024, 0, 1, 12, 30, 0);    // Jan 1, 2024, 12:30 PM UTC

// Compare with local time:
new Date(2024, 10, 24);             // Uses your local timezone
new Date(Date.UTC(2024, 10, 24));   // Uses UTC timezone
console.log(Date.UTC(2024, 10, 24)); // Output: 1732406400000

//Instance Methods - Get (Local Time)
//getFullYear()
//Gets the year (4 digits).
let date = new Date('2024-11-24');
date.getFullYear();         // 2024

let now = new Date();
now.getFullYear();          // 2025 (current year)
console.log(now.getFullYear()); // Output: 2025

//getUTCDay() method
//Gets the day of the week in UTC (0 = Sunday, 6 = Saturday).
let date1 = new Date('2024-11-24');  // Sunday
date.getUTCDay();           // 0 (Sunday)

let monday = new Date('2024-11-25');
monday.getUTCDay();         // 1 (Monday)
console.log(date1.getUTCDay()); // Output: 0


//getUTCMonth() method
//Gets the month in UTC (0 = January, 11 = December).
let date3 = new Date('2024-11-24');
date3.getUTCMonth();         // 10 (November, remember 0-indexed!)

// To get month name:
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

months[date3.getUTCMonth()]; // 'Nov'
console.log(date3.getUTCMonth()); // Output: 10

//getUTCFullYear() method
//Gets the year in UTC.
let date2 = new Date('2025-11-24');
date2.getUTCFullYear();      // 2025
console.log(date2.getUTCFullYear()); // Output: 2025

//getUTCHours() method
//Gets the hours in UTC (0-23).
let date4 = new Date('2024-11-24T15:30:00Z');
date4.getUTCHours();         // 15 (3 PM)
console.log(date4.getUTCHours()); // Output: 15

// 12-hour format:
let hour = date.getUTCHours();
let period = hour >= 12 ? 'PM' : 'AM';
let hour12 = hour % 12 || 12;  // Convert to 12-hour
console.log(`${hour12} ${period}`);  // '3 PM'

//getUTCMinutes() method
//Gets the minutes in UTC (0-59).
// Example:
let date5 = new Date('2024-11-24T15:30:00Z');
date5.getUTCMinutes();       // 30
console.log(date5.getUTCMinutes()); // Output: 30


//getUTCSeconds() method
//Gets the seconds in UTC (0-59).
let date6 = new Date('2024-11-24T15:30:45Z');
date6.getUTCSeconds();       // 45
console.log(date6.getUTCSeconds()); // Output: 45

//getUTCMilliseconds() method
//Gets the milliseconds in UTC (0-999).
let date7 = new Date('2024-11-24T15:30:45.123Z');
date7.getUTCMilliseconds();  // 123
console.log(date7.getUTCMilliseconds()); // Output: 123

//getTime() method
//Gets the timestamp (milliseconds since January 1, 1970).
let date8 = new Date('2024-11-24');
date8.getTime();             // 1732406400000

// Same as:
date.valueOf();             // 1732406400000
+date;                      // 1732406400000
console.log(date8.getTime()); // Output: 1732406400000

//Instance Methods - Set (UTC Time)
//setUTCDate()
//Sets the day of the month in UTC.
let date9 = new Date('2024-11-24');
date9.setUTCDate(15);        // Change to 15th
date9.getUTCDate();          // 15
console.log(date9.getUTCDate()); // Output: 15

//setUTCFullYear()
//Sets the year in UTC.
let date10 = new Date('2024-11-24');
date10.setUTCFullYear(2025);  // Change to 2025
date10.getUTCFullYear();      // 2025

// Can also set month and day:
date10.setUTCFullYear(2026, 0, 1);  // Jan 1, 2026
console.log(date10.getUTCFullYear()); // Output: 2026

//setUTCMonth()
//Sets the month in UTC (0 = January, 11 = December).
let date11 = new Date('2024-11-24');
date11.setUTCMonth(0);        // Change to January
date11.getUTCMonth();         // 0

// Can also set day:
date11.setUTCMonth(11, 25);   // December 25
console.log(date11.toUTCString()); // "Wed, 25 Dec 2024 ..."
console.log(date11.getUTCMonth()); // Output: 11

//setUTCHours()
//Sets the hour in UTC.
let date12 = new Date('2024-11-24T15:30:00Z');
date12.setUTCHours(10);         // Change to 10 AM
date12.getUTCHours();           // 10           
console.log(date12.getUTCHours()); // Output: 10

// Can also set minutes, seconds, ms:
date12.setUTCHours(8, 45, 30, 500); // 8:45:30.500 AM
console.log(date12.toUTCString()); // "Sun, 24 Nov 2024 08:45:30 GMT"


//setUTCMinutes()
//Sets the minutes in UTC.
let date13 = new Date('2024-11-24T10:00:00Z');
date13.setUTCMinutes(45);     // Change to 45 minutes
date13.getUTCMinutes();       // 45
console.log(date13.getUTCMinutes()); // Output: 45

// Can also set seconds, ms:
date13.setUTCMinutes(30, 15, 250); // 30 minutes, 15 seconds, 250 ms
console.log(date13.toUTCString()); // "Sun, 24 Nov 2024 10:30:15 GMT"

// Can also set seconds, ms:
date13.setUTCMinutes(30, 15, 250); // 30 minutes, 15 seconds, 250 ms
console.log(date13.toUTCString()); // "Sun, 24 Nov 2024 10:30:15 GMT"

//setUTCSeconds()
//Sets the seconds in UTC.
let date14 = new Date('2024-11-24T10:00:00Z');
date14.setUTCSeconds(30);     // Change to 30 seconds
date14.getUTCSeconds();       // 30
console.log(date14.getUTCSeconds()); // Output: 30

// Can also set milliseconds:
date14.setUTCSeconds(45, 500); // 45 seconds, 500 ms
console.log(date14.toUTCString()); // "Sun, 24 Nov 2024 10:00:45 GMT"

//setTime()
//Sets the date using a timestamp.
let date15 = new Date('2024-11-24');
date15.setTime(1700000000000);  // Set to specific timestamp
date15.getTime();             // 1700000000000
console.log(date15.getTime()); // Output: 1700000000000 


//Instance Methods - Convert to String
//toJSON()
//Converts to JSON format (ISO 8601 string).
let date16 = new Date('2024-11-24T15:30:00Z');
date16.toJSON();              // '2024-11-24T15:30:00.000Z'
console.log(date16.toJSON());

// // Useful when sending dates to APIs:
// JSON.stringify({ date: date });
// // '{"date":"2024-11-24T15:30:00.000Z"}'

//toString()
//Converts to a readable string (local time).
let date17 = new Date('2024-11-24T15:30:00Z');
date17.toString();
// 'Sun Nov 24 2024 15:30:00 GMT+0000 (Coordinated Universal Time)'
// (Actual output depends on your timezone)
console.log(new Date('2024-11-24T15:30:00Z'));

//toTimeString()
// only the time portion as a string.
let date18 = new Date('2024-11-24T15:30:00Z');
date18.toTimeString();
console.log(date18.toTimeString());
// '15:30:00 GMT+0000 (Coordinated Universal Time)'

//toUTCString()
//Converts to UTC string format.
let date19 = new Date('2024-11-24T15:30:00Z');
date.toUTCString();
console.log(date.toUTCString());
// 'Sun, 24 Nov 2024 15:30:00 GMT'
