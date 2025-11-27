// ====================================
// 1. FAST MODE: Dense Arrays (Optimized)
// ====================================

// How JavaScript Arrays Work Under the Hood
// V8 engine optimizes arrays based on their content and usage patterns. 
// Understanding these optimizations can help write more efficient code.
// Arrays can transition between different "elements kinds" based on what you store in them. 
// Here are the main types:
// 1. PACKED_SMI_ELEMENTS: Fastest, for small integers only
// 2. PACKED_DOUBLE_ELEMENTS: For floating-point numbers
// 3. PACKED_ELEMENTS: General mode for mixed types
// 4. HOLEY_ELEMENTS: Arrays with gaps (sparse arrays) - slowest

// Let's explore these concepts with examples.
// ====================================
// 1. FAST MODE: Dense Arrays (Optimized)
// ====================================

// Starting with integers only - SUPER FAST
// Elements Kind: PACKED_SMI_ELEMENTS (SMI = Small Integer)
const fastArray = [1, 2, 3, 4, 5];
console.log('Fast array:', fastArray);

// Accessing elements is lightning fast
console.log('Element at index 2:', fastArray[2]); // 3


// ====================================
// 2. DOWNGRADE: Adding Decimals
// ====================================

// Start with integers
const numbersArray = [1, 2, 3];
console.log('Integer array:', numbersArray);

// Add a decimal - array transitions to PACKED_DOUBLE_ELEMENTS
numbersArray.push(4.5);
console.log('After adding decimal:', numbersArray);
// ⚠️ This array will NEVER go back to integer-only optimization
// even if you remove the decimal!


// ====================================
// 3. FURTHER DOWNGRADE: Mixed Types
// ====================================

// Start with numbers
const mixedArray = [1, 2, 3];

// Add a string - transitions to PACKED_ELEMENTS (general mode)
mixedArray.push('hello');
console.log('Mixed types:', mixedArray);

// Add an object
mixedArray.push({ name: 'John' });
console.log('With object:', mixedArray);
// Now it's in the slowest mode but can handle anything


// ====================================
// 4. SLOW MODE: Sparse Arrays (HashTable)
// ====================================

// Creating gaps in the array
const sparseArray = [];
sparseArray[0] = 'first';
sparseArray[1000] = 'last';
// Indices 1-999 are empty (holes)

console.log('Sparse array:', sparseArray);
console.log('Length:', sparseArray.length); // 1001
console.log('Element at 500:', sparseArray[500]); // undefined

// This uses a hash table internally instead of continuous memory
// Much slower but doesn't waste memory on empty slots


// ====================================
// 5. ARRAY GROWTH: How push() Works
// ====================================

const growingArray = [1, 2, 3];
console.log('Initial:', growingArray);

// When you push and the internal backing array is full,
// V8 allocates a bigger array, copies elements, then adds new one
growingArray.push(4);
growingArray.push(5);
growingArray.push(6);
console.log('After pushing:', growingArray);

// Internally, it might have allocated space for 8 or 16 elements
// to avoid constant resizing


// ====================================
// 6. DEMONSTRATION: One-Way Transitions
// ====================================

const demo = [1, 2, 3]; // PACKED_SMI_ELEMENTS (fastest)
console.log('\n--- Transition Demo ---');
console.log('Start (integers only):', demo);

demo.push(4.5); // Transitions to PACKED_DOUBLE_ELEMENTS
console.log('After adding decimal:', demo);

demo.pop(); // Remove the decimal
console.log('After removing decimal:', demo);
// ⚠️ Array is STILL optimized for doubles, not back to integers!

demo.push('text'); // Transitions to PACKED_ELEMENTS
console.log('After adding string:', demo);
// Can never go back to more optimized modes


// ====================================
// 7. BEST PRACTICES for Performance
// ====================================

// ✅ GOOD: Keep array types consistent
const goodArray = [1, 2, 3, 4, 5];
goodArray.push(6); // Still integers, stays fast

// ❌ BAD: Mixing types slows things down
const badArray = [1, 2, 3];
badArray.push('string'); // Transitions to slow mode
badArray.push(4); // Adding integers now slower than before

// ✅ GOOD: Pre-allocate if you know the size
const preallocated = new Array(1000).fill(0);
// Better than growing one by one

// ❌ BAD: Creating sparse arrays
const sparse = [];
sparse[10000] = 1; // Creates 9999 holes, uses hash table


// ====================================
// 8. REAL-WORLD EXAMPLE
// ====================================

// Processing numbers - stays optimized
function sumNumbers(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i]; // Fast integer operations
  }
  return total;
}

const scores = [95, 87, 92, 88, 100];
console.log('\n--- Real World Example ---');
console.log('Sum of scores:', sumNumbers(scores));

// This is fast because the array stays in integer mode