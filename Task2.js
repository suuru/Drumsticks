// -----------------------------------
// Understanding JavaScript Data Types 
// -----------------------------------

//Primitive Types (NOT objects):
//String, Number, Boolean, undefined, null, Symbol, BigInt

//Reference Types (Objects):
//Object - plain objects {}

// Array - []
// Date - new Date()
// Function - function() {}
// RegExp - /regex/
// Map, Set, WeakMap, WeakSet
// CustomEvent - browser events
// CustomClass - user-defined classes
// Promise, Error, etc.
//Basic isObject Implementation
// Checks if value is a non-null object

function isObject(value) {
  return value !== null && typeof value === 'object';
}
console.log(isObject({}));          // true
console.log(isObject([]));         // true

//Comprehensive Type Detection

// Using Different Detection Methods
// Custom class for testing
class CustomClass {
  constructor(value) {
    this.value = value;
  }
}

function detectType(data) {
  console.log('Value:', data);
  console.log('typeof:', typeof data);
  console.log('toString:', Object.prototype.toString.call(data));
  console.log('constructor:', data?.constructor?.name);
  console.log('isObject:', isObject(data));
  console.log('---');
}

// Test different types
detectType({ name: 'John' });           // Plain Object
detectType([1, 2, 3]);                  // Array  
detectType(null);                       // null
detectType(new Date());                 // Date
detectType(42);                         // Number
detectType('hello');                    // String
detectType(new Map());                  // Map
detectType(new WeakMap());              // WeakMap
detectType(new CustomClass('test'));    // CustomClass

//2. Enhanced isObject with Specific Type Checks
function isObject(data) {
  if (data === null) return false;
  if (typeof data !== 'object') return false;
  return true;
}

// Specific type checking functions
function getDetailedType(data) {
  if (data === null) return 'null';
  if (data === undefined) return 'undefined';
  
  const type = typeof data;
  
  // Primitive types
  if (type !== 'object' && type !== 'function') return type;
  
  // Special object types
  if (Array.isArray(data)) return 'Array';
  if (data instanceof Date) return 'Date';
  if (data instanceof Map) return 'Map';
  if (data instanceof Set) return 'Set';
  if (data instanceof WeakMap) return 'WeakMap';
  if (data instanceof WeakSet) return 'WeakSet';
  if (data instanceof RegExp) return 'RegExp';
  if (data instanceof Promise) return 'Promise';
  if (data instanceof Error) return 'Error';
  
  // Browser-specific types
  if (typeof CustomEvent !== 'undefined' && data instanceof CustomEvent) return 'CustomEvent';
  
  // Custom classes
  if (data.constructor !== Object && data.constructor !== Function) {
    return data.constructor.name || 'CustomClass';
  }
  
  // Functions
  if (type === 'function') return 'Function';
  
  // Plain objects
  return 'Object';
}

//3.  Complete Type Checking System
function isObject(data) {
  return data !== null && typeof data === 'object';
}

function isPlainObject(data) {
  return isObject(data) && 
         Object.getPrototypeOf(data) === Object.prototype &&
         data.constructor === Object;
}

function isArray(data) {
  return Array.isArray(data);
}

function isDate(data) {
  return data instanceof Date;
}

function isMap(data) {
  return data instanceof Map;
}

function isSet(data) {
  return data instanceof Set;
}

function isWeakMap(data) {
  return data instanceof WeakMap;
}

function isWeakSet(data) {
  return data instanceof WeakSet;
}

function isCustomEvent(data) {
  return typeof CustomEvent !== 'undefined' && data instanceof CustomEvent;
}

function isFunction(data) {
  return typeof data === 'function';
}

function isNull(data) {
  return data === null;
}

function isUndefined(data) {
  return data === undefined;
}

function isNumber(data) {
  return typeof data === 'number';
}

function isString(data) {
  return typeof data === 'string';
}

function isBoolean(data) {
  return typeof data === 'boolean';
}

function isSymbol(data) {
  return typeof data === 'symbol';
}

function isBigInt(data) {
  return typeof data === 'bigint';
}

//-------------------------
//Practical Testing Examples
//--------------------------

// Test function
// Tests various data types and logs results
function testAllTypes() {
  class CustomClass {
    constructor(value) { this.value = value; }
  }

  const testCases = [
    // Primitives
    { value: 42, name: 'Number', expectedObject: false },
    { value: 'hello', name: 'String', expectedObject: false },
    { value: true, name: 'Boolean', expectedObject: false },
    { value: null, name: 'null', expectedObject: false },
    { value: undefined, name: 'undefined', expectedObject: false },
    { value: 123n, name: 'BigInt', expectedObject: false },
    { value: Symbol('test'), name: 'Symbol', expectedObject: false },
    
    // Objects
    { value: {}, name: 'Plain Object', expectedObject: true },
    { value: [], name: 'Array', expectedObject: true },
    { value: new Date(), name: 'Date', expectedObject: true },
    { value: new Map(), name: 'Map', expectedObject: true },
    { value: new Set(), name: 'Set', expectedObject: true },
    { value: new WeakMap(), name: 'WeakMap', expectedObject: true },
    { value: new WeakSet(), name: 'WeakSet', expectedObject: true },
    { value: /regex/, name: 'RegExp', expectedObject: true },
    { value: function() {}, name: 'Function', expectedObject: false }, // Special case!
    { value: () => {}, name: 'Arrow Function', expectedObject: false },
    { value: new CustomClass('test'), name: 'CustomClass', expectedObject: true },
  ];

  // Browser-only test
  if (typeof CustomEvent !== 'undefined') {
    testCases.push({ value: new CustomEvent('test'), name: 'CustomEvent', expectedObject: true });
  }

  console.log('Type Detection Results:\n');
  
  testCases.forEach(testCase => {
    const isObjectResult = isObject(testCase.value);
    const detailedType = getDetailedType(testCase.value);
    const status = isObjectResult === testCase.expectedObject ? '✓' : '✗';
    
    console.log(
      `${status} ${testCase.name.padEnd(20)}` +
      `isObject: ${isObjectResult.toString().padEnd(5)}` +
      `Type: ${detailedType}`
    );
  });
}

// Run tests
testAllTypes();

//------------------------
// Key Points to Remember
//------------------------

//1. The typeof Quirks:
typeof null         // 'object' (historical bug!)
typeof function(){} // 'function' (special case)
typeof []          // 'object'
typeof {}          // 'object'

//2. The instanceof Operator:
[] instanceof Array     // true
[] instanceof Object    // also true! (arrays are objects)
{} instanceof Object    // true

//3. Best Practices:
// For isObject function:
// Always check for null first
// Use typeof data === 'object'
// Return false for functions (even though they're technically objects)

// For specific types:
// Use Array.isArray() for arrays
// Use instanceof for custom classes and built-in types
// Use Object.prototype.toString.call() for precise typing

//Simple isObject Summary
function isObject(data) {
  // Step 1: Eliminate null (typeof null is 'object')
  if (data === null) return false;
  
  // Step 2: Check if it's object type
  if (typeof data !== 'object') return false;
  
  // Step 3: It's an object!
  return true;
}





//