// ============================================
// WHY DO WeakMap, WeakSet, AND WeakRef EXIST?
// ============================================

/*
 * THE PROBLEM THEY SOLVE: MEMORY LEAKS
 * 
 * Regular Map and Set create STRONG REFERENCES that prevent garbage collection.
 * This causes memory leaks when you store temporary data about objects.
 * 
 * WEAK REFERENCES allow objects to be garbage collected even if they're 
 * in your Map/Set/Ref - the GC can remove them when no other references exist.
 * 
 * KEY INSIGHT: "I need to associate data with an object, but I don't 
 * want my association to keep that object alive in memory forever."
 */


// ============================================
// THE MEMORY LEAK PROBLEM (Regular Map/Set)
// ============================================

console.log('=== THE PROBLEM: Memory Leaks with Regular Map ===\n');

// Example: Storing metadata about user objects
const userCache = new Map();

function createUser(id, name) {
  const user = {
    id,
    name,
    // Imagine large data here
    profileImage: new Array(10000).fill('large image data')
  };
  
  // Store metadata about the user
  userCache.set(user, {
    lastAccess: Date.now(),
    permissions: ['read', 'write']
  });
  
  return user;
}

let user1 = createUser(1, 'Alice');
let user2 = createUser(2, 'Bob');

console.log('Created 2 users, cache size:', userCache.size); // 2

// We're done with user1, remove our reference
user1 = null;

console.log('Set user1 to null, but cache size still:', userCache.size); // Still 2!
console.log('❌ MEMORY LEAK: user1 object cannot be garbage collected!');
console.log('   The Map holds a strong reference, keeping it alive forever.\n');


// ============================================
// THE SOLUTION: WeakMap
// ============================================

console.log('=== THE SOLUTION: WeakMap ===\n');

const betterUserCache = new WeakMap();

function createUserBetter(id, name) {
  const user = {
    id,
    name,
    profileImage: new Array(10000).fill('large image data')
  };
  
  // Store metadata using WeakMap
  betterUserCache.set(user, {
    lastAccess: Date.now(),
    permissions: ['read', 'write']
  });
  
  return user;
}

let user3 = createUserBetter(3, 'Charlie');
console.log('Created user3, stored in WeakMap');

// We're done with user3
user3 = null;

console.log('Set user3 to null');
console.log('✅ SOLUTION: user3 CAN be garbage collected now!');
console.log('   WeakMap uses weak references, allowing GC to clean up.\n');


// ============================================
// WeakMap: CORE FEATURES & LIMITATIONS
// ============================================

console.log('=== WeakMap: Features & Limitations ===\n');

const privateData = new WeakMap();

const user = { id: 1, name: 'Alice' };
const admin = { id: 2, name: 'Bob' };

// ✅ Can do: set, get, has, delete
privateData.set(user, { ssn: '123-45-6789', salary: 100000 });
privateData.set(admin, { ssn: '987-65-4321', salary: 150000 });

console.log('User salary:', privateData.get(user).salary); // 100000
console.log('Has admin data?', privateData.has(admin)); // true

privateData.delete(user);
console.log('Deleted user data');

// ❌ Cannot do: size, keys(), values(), entries(), forEach, iteration
// console.log(privateData.size); // undefined - doesn't exist!
// for (let key of privateData) {} // ERROR - not iterable!

console.log('\n❌ WeakMap limitations:');
console.log('   - No .size property');
console.log('   - Cannot iterate (no keys(), values(), entries())');
console.log('   - Keys MUST be objects (not primitives)');
console.log('   - No way to list all entries');

console.log('\n✅ Why these limitations?');
console.log('   - GC can remove entries at ANY TIME');
console.log('   - Checking size or iterating would interfere with GC');
console.log('   - By design: "set it and forget it" memory management\n');


// ============================================
// REAL-WORLD USE CASE #1: Private Object Data
// ============================================

console.log('=== USE CASE #1: Private Object Data ===\n');

// Without WeakMap - data is public
class UserBad {
  constructor(name, ssn) {
    this.name = name;
    this.ssn = ssn; // ❌ Public! Anyone can access user.ssn
  }
}

// With WeakMap - truly private data
const privateUserData = new WeakMap();

class UserGood {
  constructor(name, ssn) {
    this.name = name; // Public
    // Store private data externally
    privateUserData.set(this, { ssn });
  }
  
  getSSN() {
    return privateUserData.get(this).ssn;
  }
}

const goodUser = new UserGood('Alice', '123-45-6789');
console.log('Public name:', goodUser.name); // Alice
console.log('Private SSN via method:', goodUser.getSSN()); // 123-45-6789
console.log('Direct access to SSN:', goodUser.ssn); // undefined ✅
console.log('Cannot find SSN through object inspection!\n');


// ============================================
// REAL-WORLD USE CASE #2: DOM Node Metadata
// ============================================

console.log('=== USE CASE #2: DOM Node Metadata ===\n');

// Simulating DOM nodes (in browser, these would be real DOM elements)
const domCache = new WeakMap();

function attachMetadata(element, data) {
  domCache.set(element, data);
  console.log('Attached metadata to DOM element');
}

function getMetadata(element) {
  return domCache.get(element);
}

// Create fake DOM element
let myDiv = { tagName: 'DIV', id: 'container' };
attachMetadata(myDiv, {
  clickCount: 0,
  lastInteraction: Date.now(),
  customState: 'active'
});

console.log('Retrieved metadata:', getMetadata(myDiv));

// Element removed from DOM
myDiv = null;
console.log('✅ Element removed - metadata will be garbage collected too!');
console.log('   No manual cleanup needed!\n');


// ============================================
// REAL-WORLD USE CASE #3: Caching Expensive Results
// ============================================

console.log('=== USE CASE #3: Caching Expensive Computations ===\n');

const computeCache = new WeakMap();

function expensiveComputation(obj) {
  // Check cache first
  if (computeCache.has(obj)) {
    console.log('  ✅ Cache HIT - returning cached result');
    return computeCache.get(obj);
  }
  
  console.log('  ⏳ Cache MISS - computing...');
  // Simulate expensive operation
  const result = JSON.stringify(obj).length * 1000;
  
  // Cache the result
  computeCache.set(obj, result);
  return result;
}

let data1 = { name: 'Alice', age: 30, role: 'developer' };

console.log('First call:', expensiveComputation(data1));
console.log('Second call:', expensiveComputation(data1));

// Object no longer needed
data1 = null;
console.log('✅ data1 removed - cache entry will be GC\'d automatically\n');


// ============================================
// WeakSet: TRACKING OBJECTS WITHOUT DATA
// ============================================

console.log('=== WeakSet: Tracking Objects ===\n');

// Use case: Track which objects have been processed
const processedObjects = new WeakSet();

function processObject(obj) {
  if (processedObjects.has(obj)) {
    console.log('  Already processed:', obj.name);
    return;
  }
  
  console.log('  Processing:', obj.name);
  // Do some work...
  processedObjects.add(obj);
}

let task1 = { name: 'Task 1' };
let task2 = { name: 'Task 2' };

processObject(task1); // Processes
processObject(task1); // Skips (already processed)
processObject(task2); // Processes

task1 = null;
console.log('✅ task1 removed - automatically removed from WeakSet too!\n');


// ============================================
// WeakSet: PREVENTING CIRCULAR REFERENCES
// ============================================

console.log('=== USE CASE: Preventing Infinite Loops ===\n');

const visited = new WeakSet();

function deepClone(obj) {
  // Check if already visited (circular reference)
  if (visited.has(obj)) {
    console.log('  Circular reference detected!');
    return '[Circular]';
  }
  
  // Mark as visited
  visited.add(obj);
  
  const clone = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clone[key] = deepClone(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }
  
  return clone;
}

// Create circular reference
const circular = { name: 'Parent' };
circular.self = circular; // Points to itself!

console.log('Cloning object with circular reference:');
const cloned = deepClone(circular);
console.log('Result:', cloned);
console.log('✅ Handled circular reference without infinite loop!\n');


// ============================================
// WeakRef: EVEN WEAKER REFERENCES
// ============================================

console.log('=== WeakRef: Weak References to Individual Objects ===\n');

// WeakRef holds a reference that doesn't prevent GC
// Unlike WeakMap/WeakSet, you can check if object is still alive

let heavyObject = {
  name: 'Heavy Data',
  data: new Array(100000).fill('big data')
};

// Create weak reference
const weakRef = new WeakRef(heavyObject);

// Access the object (might be undefined if GC'd)
console.log('Accessing via WeakRef:');
let retrieved = weakRef.deref();
if (retrieved) {
  console.log('  Object still alive:', retrieved.name);
} else {
  console.log('  Object was garbage collected');
}

// Remove strong reference
heavyObject = null;

console.log('\nAfter setting heavyObject = null:');
retrieved = weakRef.deref();
if (retrieved) {
  console.log('  Object still alive (GC hasn\'t run yet)');
} else {
  console.log('  ✅ Object was garbage collected');
}

console.log('\n⚠️  WARNING: GC timing is unpredictable!');
console.log('   WeakRef.deref() might return the object or undefined');
console.log('   You cannot control when GC runs\n');


// ============================================
// REAL-WORLD USE CASE: Image Cache with WeakRef
// ============================================

console.log('=== USE CASE: Memory-Sensitive Image Cache ===\n');

class ImageCache {
  constructor() {
    this.cache = new Map(); // Key: URL, Value: WeakRef to image
  }
  
  set(url, imageData) {
    this.cache.set(url, new WeakRef(imageData));
    console.log(`  Cached image: ${url}`);
  }
  
  get(url) {
    const weakRef = this.cache.get(url);
    if (!weakRef) {
      console.log(`  Cache miss: ${url} (never cached)`);
      return null;
    }
    
    const image = weakRef.deref();
    if (image) {
      console.log(`  ✅ Cache hit: ${url}`);
      return image;
    } else {
      console.log(`  ⚠️  Cache miss: ${url} (was GC'd)`);
      this.cache.delete(url); // Clean up dead reference
      return null;
    }
  }
}

const imageCache = new ImageCache();

let img1 = { url: 'photo1.jpg', pixels: new Array(10000).fill(0) };
let img2 = { url: 'photo2.jpg', pixels: new Array(10000).fill(0) };

imageCache.set('photo1.jpg', img1);
imageCache.set('photo2.jpg', img2);

console.log('\nRetrieving cached images:');
imageCache.get('photo1.jpg'); // Hit
imageCache.get('photo2.jpg'); // Hit

// Simulate memory pressure - remove strong references
img1 = null;

console.log('\nAfter img1 removed from memory:');
imageCache.get('photo1.jpg'); // Might be miss if GC ran
imageCache.get('photo2.jpg'); // Still hit (img2 still in memory)

console.log('\n✅ Benefits: Cache doesn\'t prevent GC of large images!');
console.log('   Memory automatically freed when under pressure\n');


// ============================================
// COMPARISON TABLE
// ============================================

console.log('=== Comparison: Map vs WeakMap, Set vs WeakSet ===\n');

console.log('┌──────────────┬─────────────────┬─────────────────┐');
console.log('│   Feature    │   Map/Set       │  WeakMap/WeakSet│');
console.log('├──────────────┼─────────────────┼─────────────────┤');
console.log('│  References  │  Strong         │  Weak           │');
console.log('│  Keys        │  Any type       │  Objects only   │');
console.log('│  Prevents GC │  Yes            │  No             │');
console.log('│  .size       │  ✅ Yes         │  ❌ No          │');
console.log('│  Iteration   │  ✅ Yes         │  ❌ No          │');
console.log('│  keys()      │  ✅ Yes         │  ❌ No          │');
console.log('│  Use Case    │  Permanent data │  Temporary data │');
console.log('└──────────────┴─────────────────┴─────────────────┘\n');


// ============================================
// WHEN TO USE EACH
// ============================================

console.log('=== When to Use What? ===\n');

console.log('Use REGULAR MAP when:');
console.log('  ✅ You need to iterate over entries');
console.log('  ✅ You need to know the size');
console.log('  ✅ Data is permanent/long-lived');
console.log('  ✅ Keys can be primitives (strings, numbers)');

console.log('\nUse WEAKMAP when:');
console.log('  ✅ Storing metadata about objects you don\'t own');
console.log('  ✅ Private object properties');
console.log('  ✅ Caching data tied to object lifetime');
console.log('  ✅ DOM node associations');
console.log('  ✅ Don\'t want to prevent garbage collection');

console.log('\nUse REGULAR SET when:');
console.log('  ✅ Need to iterate or check size');
console.log('  ✅ Values are primitives or must stay in memory');

console.log('\nUse WEAKSET when:');
console.log('  ✅ Tracking object processing state');
console.log('  ✅ Marking objects without modifying them');
console.log('  ✅ Preventing circular reference issues');
console.log('  ✅ Don\'t need iteration or size');

console.log('\nUse WEAKREF when:');
console.log('  ✅ Building memory-sensitive caches');
console.log('  ✅ Need to check if object still exists');
console.log('  ✅ Can tolerate cache misses');
console.log('  ⚠️  WARNING: Very advanced, use sparingly!\n');


// ============================================
// COMMON MISTAKES TO AVOID
// ============================================

console.log('=== Common Mistakes ===\n');

// ❌ MISTAKE 1: Using primitives as WeakMap keys
try {
  const badWeakMap = new WeakMap();
  badWeakMap.set('string-key', 'value'); // ERROR!
} catch (e) {
  console.log('❌ Cannot use primitives as WeakMap keys');
  console.log('   Keys must be objects!');
}

// ❌ MISTAKE 2: Expecting WeakMap to have size
const wm = new WeakMap();
console.log('\n❌ WeakMap.size:', wm.size); // undefined
console.log('   Use regular Map if you need size');

// ❌ MISTAKE 3: Trying to iterate WeakMap
console.log('\n❌ Cannot iterate WeakMap:');
console.log('   for (let key of weakMap) // ERROR!');
console.log('   Use regular Map if you need iteration');

// ❌ MISTAKE 4: Relying on WeakRef timing
console.log('\n❌ NEVER rely on exact GC timing:');
console.log('   const ref = new WeakRef(obj);');
console.log('   obj = null;');
console.log('   // ref.deref() might STILL return object!');
console.log('   // GC timing is unpredictable');


// ============================================
// SUMMARY
// ============================================

console.log('\n=== SUMMARY ===\n');
console.log('KEY ROLE IN MEMORY MANAGEMENT:');
console.log('  • Prevent memory leaks from temporary associations');
console.log('  • Allow GC to clean up objects automatically');
console.log('  • Store data without extending object lifetime');
console.log('  • Enable "set it and forget it" memory management');

console.log('\nWHY THEY EXIST:');
console.log('  • Regular Map/Set create strong references');
console.log('  • Strong references prevent garbage collection');
console.log('  • This causes memory leaks in many scenarios');
console.log('  • Weak references solve this problem elegantly');

console.log('\nTRADE-OFFS:');
console.log('  • ✅ Automatic memory cleanup');
console.log('  • ✅ No manual reference tracking needed');
console.log('  • ❌ Cannot iterate or check size');
console.log('  • ❌ Keys must be objects only');
console.log('  • ❌ GC timing is unpredictable');

console.log('\n💡 GOLDEN RULE:');
console.log('   Use weak references when object lifetime matters');
console.log('   more than your data structure\'s lifetime!');