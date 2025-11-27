// ============================================
// WHAT IS THE GARBAGE COLLECTOR?
// ============================================

/*
 * SIMPLE DEFINITION:
 * The Garbage Collector (GC) is an automatic memory cleaner in JavaScript.
 * Think of it as a janitor that constantly walks through your program's memory,
 * identifying and removing "trash" (unused objects) to free up space.
 * 
 * WHY DO WE NEED IT?
 * - JavaScript allocates memory automatically when you create objects
 * - Without GC, memory would fill up and your program would crash
 * - It prevents memory leaks (memory that's allocated but never freed)
 * 
 * IMPORTANT: You cannot manually control the GC in JavaScript!
 * It runs automatically in the background.
 */


// ============================================
// HOW DOES THE GARBAGE COLLECTOR WORK?
// ============================================

/*
 * THE CORE ALGORITHM: MARK-AND-SWEEP
 * 
 * Step 1: MARK
 * - GC starts from "roots" (global variables, current function stack)
 * - It "marks" all objects that are reachable (can be accessed)
 * - It follows references like a detective following clues
 * 
 * Step 2: SWEEP
 * - All unmarked objects (unreachable) are considered garbage
 * - GC deletes them and frees their memory
 * 
 * Example of what's "reachable":
 */

// Global variable - ROOT (always reachable)
let globalUser = { name: 'Alice' };

function example() {
  // Local variable - reachable while function is running
  let localData = { temp: 'data' };
  
  // This object is reachable through globalUser
  globalUser.friend = { name: 'Bob' };
  
  // When function ends, localData becomes unreachable → GARBAGE!
}

example();
// After function ends: localData is gone, but globalUser.friend remains


// ============================================
// GENERATIONAL GARBAGE COLLECTION
// ============================================

/*
 * V8 (Chrome/Node.js) uses a smart strategy:
 * It divides memory into TWO GENERATIONS
 * 
 * 1. YOUNG GENERATION (Nursery) - Size: ~1-8MB
 *    - Where new objects are born
 *    - Collected very frequently (fast)
 *    - Algorithm: "Scavenge" (copying collector)
 *    - Most objects die young (short-lived)
 * 
 * 2. OLD GENERATION - Size: Much larger
 *    - Where survivors are promoted
 *    - Collected less frequently (slower)
 *    - Algorithm: "Mark-Sweep-Compact"
 *    - Objects that live here tend to stay alive
 * 
 * THE GENERATIONAL HYPOTHESIS:
 * "Most objects die young" - this is true for ~80% of objects!
 */

console.log('=== Generational GC Demo ===\n');

// Young object (dies immediately)
function createTemporaryObjects() {
  for (let i = 0; i < 1000; i++) {
    let temp = { id: i, data: 'temporary' };
    // temp dies at end of each loop iteration
    // Collected by YOUNG GENERATION GC (Scavenge)
  }
}

createTemporaryObjects();

// Old object (survives multiple GC cycles)
const longLivedCache = new Map();
longLivedCache.set('key1', 'persists for entire program');
// This will be promoted to OLD GENERATION
// Only collected by MAJOR GC (Mark-Sweep)


// ============================================
// HOW OFTEN DOES GC RUN?
// ============================================

/*
 * GC RUNS AUTOMATICALLY based on these triggers:
 * 
 * YOUNG GENERATION (Minor GC / Scavenge):
 * - Runs when young generation space is full
 * - Very frequent (can be hundreds of times per second)
 * - Very fast (typically 1-10ms pause)
 * 
 * OLD GENERATION (Major GC / Mark-Sweep):
 * - Runs when old generation is getting full
 * - Less frequent (might be seconds or minutes apart)
 * - Slower (can be 100ms+ pause in old implementations)
 * 
 * MODERN OPTIMIZATIONS:
 * - Incremental GC: Breaks work into small chunks
 * - Concurrent GC: Runs on separate threads
 * - Idle-time GC: Runs when CPU is idle
 * 
 * You have NO CONTROL over when it runs!
 */

console.log('\n=== GC Timing Demo ===');
console.log('GC runs automatically - you cannot control it!');
console.log('Minor GC: ~every few milliseconds (when young gen fills)');
console.log('Major GC: ~when old generation fills (less frequent)');


// ============================================
// HOW MUCH MEMORY & CPU DOES GC USE?
// ============================================

/*
 * MEMORY OVERHEAD:
 * - Young Generation: ~1-8MB
 * - Old Generation: Depends on your app (can be 100s of MBs)
 * - GC itself needs some memory for bookkeeping
 * 
 * CPU USAGE:
 * - Modern V8: ~5-10% of CPU time on average
 * - Can spike to 20-50% during heavy GC periods
 * - "Stop-the-world" pauses: Your code STOPS while GC runs
 * 
 * PAUSE TIMES (how long your code is frozen):
 * - Minor GC: 1-10ms (barely noticeable)
 * - Major GC (old): 10-100ms+ (can cause lag)
 * - Orinoco improvements: Reduced to <50ms for most cases
 * 
 * REAL-WORLD IMPACT:
 * - Good: You don't manage memory manually
 * - Bad: Can cause frame drops in games/animations
 * - Bad: Can slow down high-performance apps
 */

console.log('\n=== GC Resource Usage ===');
console.log('Memory: Young Gen ~1-8MB, Old Gen varies');
console.log('CPU: ~5-10% average, can spike to 20-50%');
console.log('Pause Times: Minor ~1-10ms, Major ~10-100ms');


// ============================================
// DEMONSTRATION: REACHABILITY
// ============================================

console.log('\n=== Reachability Examples ===\n');

// Example 1: Object becomes unreachable
let user1 = { name: 'John' };
console.log('Created user1:', user1.name);

user1 = null; // Remove reference
console.log('Set user1 to null - original object is now GARBAGE');

// Example 2: Multiple references
let user2 = { name: 'Alice' };
let admin = user2; // Both reference same object

user2 = null;
console.log('user2 = null, but object still reachable via admin:', admin.name);

admin = null;
console.log('admin = null - NOW the object is GARBAGE');

// Example 3: Circular references (GC handles this!)
function circularReferenceExample() {
  let obj1 = {};
  let obj2 = {};
  
  obj1.ref = obj2; // obj1 → obj2
  obj2.ref = obj1; // obj2 → obj1
  
  console.log('\nCreated circular reference: obj1 ↔ obj2');
  // When function ends, both become unreachable
  // Modern GC can collect them (old reference counting couldn't!)
}

circularReferenceExample();
console.log('Function ended - circular objects are GARBAGE');


// ============================================
// WHAT HAPPENS IF GC IS DISABLED?
// ============================================

/*
 * IMPORTANT: You CANNOT disable GC in normal JavaScript!
 * But if you could (or in older/experimental engines), here's what happens:
 * 
 * 1. MEMORY LEAKS EVERYWHERE
 *    - Every object you create stays in memory forever
 *    - Memory usage grows constantly
 *    - Example: Create 1000 objects = Memory increases by (object size × 1000)
 * 
 * 2. APPLICATION CRASHES
 *    - Eventually you run out of memory
 *    - Browser/Node.js crashes with "Out of Memory" error
 *    - Typical error: "FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed"
 * 
 * 3. TIMING OF CRASH
 *    - Depends on available memory and creation rate
 *    - Mobile: Might crash in seconds/minutes
 *    - Desktop: Might take hours but will eventually crash
 * 
 * 4. NO RECOVERY
 *    - Without GC, there's no way to free memory
 *    - Only solution: Restart the application
 */

console.log('\n=== What if GC was Disabled? ===');

// Simulation of what would happen (this WON'T actually disable GC)
function simulateNoGC() {
  console.log('\nSimulating memory leak (as if GC was disabled)...');
  
  const leakyArray = [];
  let iteration = 0;
  
  // This will eventually crash if run long enough
  const interval = setInterval(() => {
    // Create 1000 objects per tick
    for (let i = 0; i < 1000; i++) {
      leakyArray.push({
        id: i,
        data: new Array(1000).fill('MEMORY LEAK!'),
        timestamp: Date.now()
      });
    }
    
    iteration++;
    
    // Check memory usage (in Node.js)
    if (typeof process !== 'undefined') {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`Iteration ${iteration}: ${Math.round(used)} MB used`);
    } else {
      console.log(`Iteration ${iteration}: Memory growing...`);
    }
    
    // Stop after 10 iterations for demo
    if (iteration >= 10) {
      clearInterval(interval);
      console.log('\nStopped simulation.');
      console.log('In reality without GC, this would continue until crash!');
    }
  }, 100);
}

// Uncomment to run simulation (will use lots of memory!)
// simulateNoGC();


// ============================================
// COMMON MEMORY LEAK PATTERNS (even with GC!)
// ============================================

console.log('\n=== Common Memory Leaks ===\n');

// Leak 1: Forgotten global variables
function createAccidentalGlobal() {
  // Missing 'let' or 'const' creates GLOBAL variable!
  leakedGlobal = { data: 'I will never be collected!' };
  console.log('Created accidental global - will NEVER be garbage collected');
}
createAccidentalGlobal();

// Leak 2: Forgotten timers
function forgetfulTimer() {
  const hugeData = new Array(1000000).fill('data');
  
  setInterval(() => {
    console.log('Timer running with huge data');
    // This closure keeps hugeData in memory FOREVER
  }, 10000);
  
  console.log('Started timer that will NEVER be cleared');
}
// forgetfulTimer(); // Uncomment to see leak

// Leak 3: Forgotten event listeners
function forgetfulListeners() {
  const element = document.createElement('div');
  const hugeData = new Array(1000000).fill('data');
  
  element.addEventListener('click', () => {
    console.log(hugeData.length); // Keeps hugeData in memory
  });
  
  // If we don't removeEventListener, hugeData stays in memory!
  console.log('Added event listener - forgot to remove it!');
}

// Leak 4: Detached DOM nodes
function detachedDOMNodes() {
  const parent = document.createElement('div');
  const child = document.createElement('span');
  parent.appendChild(child);
  
  // Store reference
  const myElement = child;
  
  // Remove from DOM
  parent.removeChild(child);
  
  // myElement still references the node - MEMORY LEAK!
  console.log('Removed from DOM but still referenced:', myElement);
}


// ============================================
// HOW TO HELP THE GARBAGE COLLECTOR
// ============================================

console.log('\n=== Helping the Garbage Collector ===\n');

// ✅ GOOD: Clear references when done
function goodPractice() {
  let bigData = new Array(1000000).fill('data');
  
  // Use the data
  console.log('Using big data...');
  
  // Clear reference when done
  bigData = null;
  console.log('✅ Cleared reference - now eligible for GC');
}
goodPractice();

// ✅ GOOD: Use local variables (not global)
function useLocalVariables() {
  let localData = { temp: 'value' };
  // Automatically eligible for GC when function ends
}

// ✅ GOOD: Clean up timers
function properTimerCleanup() {
  const intervalId = setInterval(() => {
    console.log('Doing work...');
  }, 1000);
  
  // Remember to clear it!
  setTimeout(() => {
    clearInterval(intervalId);
    console.log('✅ Timer cleared properly');
  }, 5000);
}

// ✅ GOOD: Remove event listeners
function properEventCleanup() {
  const button = document.createElement('button');
  
  function handleClick() {
    console.log('Clicked!');
  }
  
  button.addEventListener('click', handleClick);
  
  // Later, remove it
  button.removeEventListener('click', handleClick);
  console.log('✅ Event listener removed properly');
}


// ============================================
// ADVANCED: WEAK REFERENCES
// ============================================

console.log('\n=== WeakMap/WeakSet (GC-friendly) ===\n');

// Regular Map prevents garbage collection
const regularMap = new Map();
let obj = { name: 'Will stay in memory' };
regularMap.set(obj, 'metadata');
obj = null; // Object STILL in memory because Map holds it!

// WeakMap allows garbage collection
const weakMap = new WeakMap();
let obj2 = { name: 'Can be collected' };
weakMap.set(obj2, 'metadata');
obj2 = null; // Object CAN be garbage collected now!

console.log('WeakMap allows objects to be GC\'d even if in the map');


// ============================================
// MONITORING GARBAGE COLLECTION
// ============================================

console.log('\n=== Monitoring GC ===\n');

// In Node.js, you can track GC with flags
// Run with: node --trace-gc yourfile.js

if (typeof process !== 'undefined') {
  const memBefore = process.memoryUsage();
  console.log('Memory before:', Math.round(memBefore.heapUsed / 1024 / 1024), 'MB');
  
  // Create garbage
  for (let i = 0; i < 1000000; i++) {
    let temp = { id: i };
  }
  
  const memAfter = process.memoryUsage();
  console.log('Memory after:', Math.round(memAfter.heapUsed / 1024 / 1024), 'MB');
  console.log('\nGC likely ran during/after the loop');
}


// ============================================
// SUMMARY
// ============================================

console.log('\n=== GARBAGE COLLECTOR SUMMARY ===\n');
console.log('What: Automatic memory cleaner');
console.log('How: Mark-and-Sweep algorithm + Generational');
console.log('When: Automatically (Minor GC: very frequent, Major GC: less frequent)');
console.log('Memory: Young Gen ~1-8MB, Old Gen varies by app');
console.log('CPU: ~5-10% average, can spike to 20-50%');
console.log('Pauses: Minor ~1-10ms, Major ~10-100ms');
console.log('Disabled: Would cause GUARANTEED crash due to memory exhaustion');
console.log('\nKey Rule: Keep objects reachable only as long as needed!');