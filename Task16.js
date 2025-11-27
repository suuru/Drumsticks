// ========================================
// PART 1: HOW SET AND MAP WORK INTERNALLY
// ========================================

/*
 * ALGORITHM: DETERMINISTIC HASH TABLE
 * 
 * Both Set and Map use a special type of hash table called 
 * "Deterministic Hash Table" (also called OrderedHashTable in V8).
 * 
 * WHY? Regular hash tables don't guarantee insertion order,
 * but JavaScript requires Map/Set to iterate in insertion order.
 * 
 * TIME COMPLEXITY: O(1) for get, set, add, has operations
 */

// ========================================
// HOW THE ALGORITHM WORKS (SIMPLIFIED)
// ========================================

/*
 * DETERMINISTIC HASH TABLE STRUCTURE:
 * 
 * 1. BUCKETS ARRAY - Points to entries
 * 2. ENTRIES ARRAY - Stores actual data in insertion order
 * 3. HASH FUNCTION - Maps keys to bucket indices
 * 
 * Example internal structure:
 * 
 * Buckets: [2, -1, 0, -1]  // Points to entry indices (-1 = empty)
 * Entries: [
 *   [key1, value1, nextIndex],  // Index 0
 *   [key2, value2, nextIndex],  // Index 1
 *   [key3, value3, nextIndex]   // Index 2
 * ]
 */


// ========================================
// PART 2: BUILD YOUR OWN MAP/SET
// ========================================

// SIMPLE HASH FUNCTION
function simpleHash(key, bucketCount) {
  // Convert key to string and generate hash
  const str = String(key);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % bucketCount;
  }
  
  return hash;
}


// CUSTOM MAP IMPLEMENTATION
class SimpleMap {
  constructor(initialSize = 16) {
    this.bucketCount = initialSize;
    this.buckets = new Array(this.bucketCount).fill(-1); // -1 means empty
    this.entries = []; // Stores [key, value, nextIndex]
    this.size = 0;
    this.loadFactor = 2; // Rehash when size > bucketCount * 2
  }
  
  // Hash function to find bucket
  _hash(key) {
    return simpleHash(key, this.bucketCount);
  }
  
  // Set a key-value pair
  set(key, value) {
    const bucketIndex = this._hash(key);
    let entryIndex = this.buckets[bucketIndex];
    
    // Check if key already exists (walk the chain)
    while (entryIndex !== -1) {
      const entry = this.entries[entryIndex];
      if (entry[0] === key) {
        // Key exists, update value
        entry[1] = value;
        return this;
      }
      entryIndex = entry[2]; // Move to next in chain
    }
    
    // Key doesn't exist, add new entry
    const newEntryIndex = this.entries.length;
    this.entries.push([key, value, this.buckets[bucketIndex]]);
    this.buckets[bucketIndex] = newEntryIndex;
    this.size++;
    
    // Check if we need to rehash
    if (this.size > this.bucketCount * this.loadFactor) {
      this._rehash();
    }
    
    return this;
  }
  
  // Get a value by key
  get(key) {
    const bucketIndex = this._hash(key);
    let entryIndex = this.buckets[bucketIndex];
    
    // Walk the chain to find the key
    while (entryIndex !== -1) {
      const entry = this.entries[entryIndex];
      if (entry[0] === key) {
        return entry[1];
      }
      entryIndex = entry[2];
    }
    
    return undefined;
  }
  
  // Check if key exists
  has(key) {
    return this.get(key) !== undefined;
  }
  
  // Delete a key
  delete(key) {
    const bucketIndex = this._hash(key);
    let entryIndex = this.buckets[bucketIndex];
    let prevIndex = -1;
    
    while (entryIndex !== -1) {
      const entry = this.entries[entryIndex];
      if (entry[0] === key) {
        // Found it, remove from chain
        if (prevIndex === -1) {
          this.buckets[bucketIndex] = entry[2];
        } else {
          this.entries[prevIndex][2] = entry[2];
        }
        this.size--;
        return true;
      }
      prevIndex = entryIndex;
      entryIndex = entry[2];
    }
    
    return false;
  }
  
  // Iterate in insertion order (this is the key feature!)
  *[Symbol.iterator]() {
    for (const [key, value] of this.entries) {
      if (key !== undefined) {
        yield [key, value];
      }
    }
  }
  
  // Rehash when load factor exceeded
  _rehash() {
    const oldEntries = this.entries;
    this.bucketCount *= 2;
    this.buckets = new Array(this.bucketCount).fill(-1);
    this.entries = [];
    this.size = 0;
    
    // Re-insert all entries
    for (const [key, value] of oldEntries) {
      if (key !== undefined) {
        this.set(key, value);
      }
    }
  }
}


// CUSTOM SET IMPLEMENTATION (simpler - just keys, no values)
class SimpleSet {
  constructor() {
    this.map = new SimpleMap();
  }
  
  add(value) {
    this.map.set(value, true);
    return this;
  }
  
  has(value) {
    return this.map.has(value);
  }
  
  delete(value) {
    return this.map.delete(value);
  }
  
  get size() {
    return this.map.size;
  }
  
  *[Symbol.iterator]() {
    for (const [key] of this.map) {
      yield key;
    }
  }
}


// ========================================
// TESTING OUR IMPLEMENTATIONS
// ========================================

console.log('=== Testing Custom Map ===');
const myMap = new SimpleMap();

myMap.set('name', 'Alice');
myMap.set('age', 30);
myMap.set('city', 'NYC');

console.log('Get name:', myMap.get('name'));
console.log('Has age:', myMap.has('age'));
console.log('Size:', myMap.size);

// Iteration maintains insertion order!
console.log('Iteration order:');
for (const [key, value] of myMap) {
  console.log(`  ${key}: ${value}`);
}

console.log('\n=== Testing Custom Set ===');
const mySet = new SimpleSet();

mySet.add(1);
mySet.add(2);
mySet.add(3);
mySet.add(2); // Duplicate, won't be added

console.log('Has 2:', mySet.has(2));
console.log('Size:', mySet.size);

console.log('Values:');
for (const value of mySet) {
  console.log(`  ${value}`);
}


// ========================================
// PART 3: OBJECT vs ARRAY vs MAP vs SET
// ========================================

console.log('\n=== DIFFERENCES: Object vs Array vs Map vs Set ===\n');

// 1. OBJECT - General purpose key-value store
const obj = {
  name: 'John',
  age: 25,
  123: 'numeric key', // Numeric keys are converted to strings
};

console.log('OBJECT:');
console.log('- Keys: Any string or symbol');
console.log('- Order: Not guaranteed (though modern engines try)');
console.log('- Size: Must calculate manually (Object.keys(obj).length)');
console.log('- Has inherited properties (toString, etc.)');
console.log('- Fast for simple data, but can clash with prototype');


// 2. ARRAY - Ordered list with numeric indices
const arr = [10, 20, 30, 40];

console.log('\nARRAY:');
console.log('- Keys: Sequential integers starting at 0');
console.log('- Order: Always maintained by index');
console.log('- Size: Built-in .length property');
console.log('- Optimized for sequential access');
console.log('- Has array methods (push, pop, map, etc.)');
console.log('- Internally: Contiguous memory if "packed"');


// 3. MAP - True key-value hash table
const map = new Map();
map.set('name', 'Alice');
map.set(42, 'number key'); // Can use any type as key!
map.set({id: 1}, 'object key'); // Even objects!

console.log('\nMAP:');
console.log('- Keys: ANY type (objects, functions, primitives)');
console.log('- Order: Insertion order guaranteed');
console.log('- Size: Built-in .size property');
console.log('- No inherited properties');
console.log('- Better performance for frequent add/delete');
console.log('- Uses deterministic hash table internally');


// 4. SET - Collection of unique values
const set = new Set([1, 2, 3, 2, 1]); // Duplicates removed

console.log('\nSET:');
console.log('- Stores unique values only');
console.log('- Order: Insertion order guaranteed');
console.log('- Size: Built-in .size property');
console.log('- Fast lookup: O(1) for has()');
console.log('- Implemented as Map with values=true internally');


// ========================================
// PERFORMANCE COMPARISON
// ========================================

console.log('\n=== PERFORMANCE CHARACTERISTICS ===\n');

console.log('OBJECT:');
console.log('  Get: O(1)  Set: O(1)  Delete: O(1)');
console.log('  Best for: Static structure, string keys');
console.log('  Avoid for: Frequent add/delete, non-string keys\n');

console.log('ARRAY:');
console.log('  Access by index: O(1)  Push/pop: O(1)');
console.log('  Search: O(n)  Insert middle: O(n)');
console.log('  Best for: Sequential data, indexed access');
console.log('  Avoid for: Lookup by value, sparse data\n');

console.log('MAP:');
console.log('  Get: O(1)  Set: O(1)  Delete: O(1)  Has: O(1)');
console.log('  Best for: Any key type, frequent updates');
console.log('  Avoid for: Simple string-only lookups (Object is fine)\n');

console.log('SET:');
console.log('  Add: O(1)  Has: O(1)  Delete: O(1)');
console.log('  Best for: Unique values, membership testing');
console.log('  Avoid for: Ordered lists, duplicates needed');


// ========================================
// REAL-WORLD USAGE EXAMPLES
// ========================================

console.log('\n=== WHEN TO USE EACH ===\n');

// Use OBJECT for simple data structures
const user = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
};

// Use ARRAY for ordered lists
const scores = [95, 87, 92, 88];

// Use MAP when you need non-string keys or frequent updates
const cache = new Map();
cache.set(getUserById(1), 'cached data');
cache.set(getUserById(2), 'more data');

// Use SET for uniqueness
const uniqueVisitors = new Set();
uniqueVisitors.add('user1');
uniqueVisitors.add('user2');
uniqueVisitors.add('user1'); // Won't add duplicate

function getUserById(id) {
  return { id }; // Mock function
}