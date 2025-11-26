//ARRAYS METHODS

//new Array vs []
// Both create arrays, but [] is preferred
const arr1 = new Array(3); // Creates array with 3 empty slots
const arr2 = [1, 2, 3];    // Creates array with values
console.log(arr1); // [empty × 3]
console.log(arr2); // [1, 2, 3]

//Array.of()
// Creates array from arguments (better than new Array)
const arr0 = Array.of(1, 2, 3); // [1, 2, 3]
const arr3 = Array.of(5);      // [5] (not [empty × 5])
console.log(arr0);
console.log(arr3);

//Array.from()
// Creates array from array-like or iterable objects
const str = 'hello';
const arrFromStr = Array.from(str); // ['h', 'e', 'l', 'l', 'o']
console.log(arrFromStr);

//at()
// Access elements using positive or negative indices
const arr4 = [10, 20, 30];
console.log(arr4.at());  // 10 (same as arr[0])
console.log(arr4.at(-1)); // 30 (last element)
console.log(arr4.at(-2)); // 20 (second last)

//includes()
// Checks if array contains a value
// Returns true or false
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('apple')); // true
console.log(fruits.includes('grape')); // false

//indexOf() & lastIndexOf()
// Returns first/last index of value or -1 if not found
const numbers = [1, 2, 3, 2, 1];
console.log(numbers.indexOf(2));    // 1 (first occurrence)
console.log(numbers.lastIndexOf(2)); // 3 (last occurrence)
console.log(numbers.indexOf(5));    // -1 (not found)

//----------------------------
//ADDING OR REMOVING ELEMENTS
//----------------------------

//push() & pop() (end of array)
//push adds elements to end, pop removes last element
const arr5 = [1, 2, 3];
arr5.push(4);        // [1, 2, 3, 4] - returns new length
const last = arr5.pop(); // [1, 2, 3] - returns 4
console.log(arr5);
console.log(last);

//unshift() & shift() (beginning of array)
//unshift adds elements to start, shift removes first element
const arr6 = [2, 3];
arr6.unshift(1);      // [1, 2, 3] - adds to start
const first = arr6.shift(); // [2, 3] - removes from start
console.log(arr6);
console.log(first);

//concat()
// Merges arrays, returns new array
const arr7 = [1, 2];
const arr8 = [3, 4];
const merged = arr7.concat(arr8);
console.log(merged); // [1, 2, 3, 4]

//Transforming Arrays

//map()
// Transforms each element, returns new array
const nums = [1, 2, 3];
const doubled = nums.map(x => x * 2);
console.log(doubled); // [2, 4, 6]

//filter()
// Filters elements based on condition, returns new array
const filtered = nums.filter(x => x > 1);
console.log(filtered); // [2, 3]

//reduce()
// Reduces array to single value using accumulator function
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 6

//forEach()
// Executes function for each element, no return value
nums.forEach(x => console.log(x * 2)); // 2, 4, 6 (logged separately)

//reduceRight()
// Reduces array from right to left
const words = ['h', 'e', 'l', 'l', 'o'];
const reversed = words.reduceRight((str, char) => str + char, ''); // "olleh"
console.log(reversed);

//flat()
// Flattens nested arrays
const nested = [1, [2, [3, 4]]];
const flatOnce = nested.flat();       // [1, 2, [3, 4]]
const flatCompletely = nested.flat(2); // [1, 2, 3, 4]
console.log(flatOnce);
console.log(flatCompletely);

//Searching
//find() & findIndex()
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

const user = users.find(u => u.id === 2); // { id: 2, name: 'Bob' }
const index = users.findIndex(u => u.name === 'Alice'); // 0
console.log(user);
console.log(index);


//Checking Conditions
//every() & some()
//every checks if all elements meet condition
//some checks if at least one element meets condition
const allAboveZero = nums.every(x => x > 0); // true
const someAboveTwo = nums.some(x => x > 2);   // true
console.log(allAboveZero);
console.log(someAboveTwo);

//Iterating
//forEach()
// Executes function for each element, no return value
//keys(), values(), entries()
const fruits1 = ['apple', 'banana', 'orange'];
fruits1.forEach((fruit, index) => {
console.log(`${index}: ${fruits1}`);
});
// Output: 0: apple, 1: banana, 2: orange

//Modifying Arrays
//fill()
// Fills array with static value
const arr = [1, 2, 3, 4];
arr.fill(0, 1, 3); // [1, 0, 0, 4] (fill with 0 from index 1 to 3)
console.log(arr);

//reverse()
// Reverses array in place
const arrRev = [1, 2, 3];
arrRev.reverse(); // [3, 2, 1]
console.log(arrRev);

//sort()
// Sorts array in place
const arrSort = [3, 1, 2];
arrSort.sort(); // [1, 2, 3]
console.log(arrSort);

//Copying Parts

//slice()
// Returns shallow copy of portion of array
const arrSlice = [1, 2, 3, 4, 5];
const subArr = arrSlice.slice(1, 4);
console.log(subArr); // [2, 3, 4]

//splice()
// Adds/removes elements, modifies original array
const arrSplice = [1, 2, 3, 4, 5];
arrSplice.splice(2, 1, 'a', 'b'); // Removes 1 element at index 2, adds 'a' and 'b'
console.log(arrSplice); // [1, 2, 'a', 'b', 4, 5]

//New Immutable Methods (ES2023)

//toReversed(), toSorted(), toSpliced(), with()
// These methods return new arrays with the specified modifications without changing the original array

const original = [3, 1, 2];
const reversedArr = original.toReversed(); // [2, 1, 3]
const sortedArr = original.toSorted(); // [1, 2, 3]
const splicedArr = original.toSpliced(1, 1, 'a', 'b');  // [3, 'a', 'b', 2]
const withArr = original.with(0, 10); // [10, 1, 2]

console.log(reversedArr);
console.log(sortedArr);
console.log(splicedArr);
console.log(withArr);
// Original array remains unchanged 
console.log(original); // [3, 1, 2]

//Utility Methods
//join()
// Joins array elements into string with specified separator
const arrJoin = ['Hello', 'world'];
const strJoin = arrJoin.join(' '); // "Hello world"
console.log(strJoin);

//toString()
// Converts array to string
const arrToStr = [1, 2, 3];
const strToStr = arrToStr.toString(); // "1,2,3"
console.log(strToStr);

//Array.isArray()
// Checks if value is an array
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello'));   // false

//Iterators
//keys(), values(), entries()
const arrIter = ['a', 'b', 'c'];
const keys = arrIter.keys();
const values = arrIter.values();
const entries = arrIter.entries();


