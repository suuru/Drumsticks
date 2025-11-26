// ============================================
// COMPLETE GUIDE: toString() and valueOf()
// ============================================
// TASK 7
// ======

console.log("=== UNDERSTANDING toString() and valueOf() ===\n");

// ============================================
// PART 1: WHAT ARE THEY?
// ============================================
console.log("--- PART 1: What Are They? ---\n");

/*
toString() - Converts an object to a STRING representation
valueOf() - Returns the PRIMITIVE VALUE of an object

Every object in JavaScript has these two methods inherited from Object.prototype
*/

let num = 42;
console.log("num.toString():", num.toString());    // "42" (string)
console.log("num.valueOf():", num.valueOf());      // 42 (number)

let date = new Date("2024-11-24");
console.log("date.toString():", date.toString());  // Full date string
console.log("date.valueOf():", date.valueOf());    // Timestamp (number)

// ============================================
// PART 2: WHO CALLS THEM?
// ============================================
console.log("\n--- PART 2: Who Calls Them? ---\n");

/*
JAVASCRIPT AUTOMATICALLY CALLS THEM when it needs to convert an object
to a primitive value (string, number, or boolean).

This is called "Type Coercion" or "Type Conversion"
*/

let obj = {
  name: "Box",
  value: 100
};

// JavaScript automatically calls toString() here:
console.log("String context: " + obj);  
// Output: "[object Object]"

// JavaScript automatically calls valueOf() here:
console.log("Number context:", obj + 5);
// Output: "[object Object]5" (because valueOf returns object, falls back to toString)

// ============================================
// PART 3: WHERE ARE THEY USED?
// ============================================
console.log("\n--- PART 3: Where Are They Used? ---\n");

/*
toString() is called in STRING CONTEXTS:
- String concatenation with +
- Template literals
- String() constructor
- alert(), console.log() with objects
*/

let product = {
  name: "Laptop",
  price: 1000,
  toString() {
    return `${this.name} - $${this.price}`;
  }
};

console.log("String concatenation: " + product);
console.log(`Template literal: ${product}`);
console.log("String() constructor:", String(product));

/*
valueOf() is called in NUMBER/MATH CONTEXTS:
- Mathematical operations (+, -, *, /)
- Comparison operators (>, <, >=, <=)
- Number() constructor
*/

let counter = {
  count: 10,
  valueOf() {
    return this.count;
  },
  toString() {
    return `Count: ${this.count}`;
  }
};

console.log("Math operation:", counter + 5);        // 15 (valueOf called)
console.log("Comparison:", counter > 5);            // true (valueOf called)
console.log("Number():", Number(counter));          // 10 (valueOf called)
console.log("String context:", "Value: " + counter); // "Value: 10" (valueOf, then toString)

// ============================================
// PART 4: THE PRINCIPLE - HOW DO THEY WORK?
// ============================================
console.log("\n--- PART 4: How Do They Work? ---\n");

/*
CONVERSION PROCESS:

When JavaScript needs a primitive value from an object:

1. It checks what context it needs (string? number? default?)
2. It calls the appropriate method
3. If that method returns an object (not primitive), it tries the other method
4. If both return objects, it throws an error (usually)

CONTEXT TYPES:
- "string" context: Needs a string (concatenation, template literals)
- "number" context: Needs a number (math, comparisons)
- "default" context: Could be either (mostly treated as number)
*/

// Example: Default behavior
let defaultObj = {};
console.log("Default toString:", defaultObj.toString());  // "[object Object]"
console.log("Default valueOf:", defaultObj.valueOf());    // {} (the object itself)

// ============================================
// PART 5: WHY ARE THEY NEEDED?
// ============================================
console.log("\n--- PART 5: Why Are They Needed? ---\n");

/*
REASONS:

1. HUMAN-READABLE DISPLAY
   - Objects need meaningful string representations for debugging and display

2. MATHEMATICAL OPERATIONS
   - Some objects represent numeric values (Date = timestamp, custom wrappers)

3. CUSTOM BEHAVIOR
   - You can control how your objects behave in different contexts

4. DEBUGGING
   - Makes console.log() and error messages more useful
*/

// Example: Custom Money class
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
  
  valueOf() {
    return this.amount;  // For math operations
  }
  
  toString() {
    return `${this.amount} ${this.currency}`;  // For display
  }
}

let price1 = new Money(50, "USD");
let price2 = new Money(30, "USD");

console.log("Display price:", "Total: " + price1);     // "Total: 50 USD"
console.log("Calculate total:", price1 + price2);       // 80 (uses valueOf)
console.log("Compare prices:", price1 > price2);        // true (uses valueOf)

// ============================================
// PART 6: IN WHICH ORDER ARE THEY CALLED?
// ============================================
console.log("\n--- PART 6: Call Order ---\n");

/*
THE ORDER DEPENDS ON THE CONTEXT:

1. STRING CONTEXT (like "text" + obj):
   - First tries: toString()
   - If that returns an object, tries: valueOf()
   - If both return objects: error

2. NUMBER CONTEXT (like obj + 5 or obj > 5):
   - First tries: valueOf()
   - If that returns an object, tries: toString()
   - If both return objects: error

3. DEFAULT CONTEXT (rare, usually acts like number):
   - First tries: valueOf()
   - Then tries: toString()
*/

let tracker = {
  valueOf() {
    console.log("  → valueOf() called");
    return 42;
  },
  toString() {
    console.log("  → toString() called");
    return "Forty-Two";
  }
};

console.log("String context:");
console.log("Result:", String(tracker));

console.log("\nNumber context:");
console.log("Result:", Number(tracker));

console.log("\nMath operation:");
console.log("Result:", tracker + 10);

console.log("\nString concatenation:");
console.log("Result:", "Value: " + tracker);

// ============================================
// PART 7: SPECIAL CASE - WHEN BOTH ARE USED
// ============================================
console.log("\n--- PART 7: When Both Methods Matter ---\n");

let confusing = {
  valueOf() {
    console.log("  → valueOf() called, returning object");
    return {};  // Returns object, not primitive!
  },
  toString() {
    console.log("  → toString() called, returning string");
    return "I'm a string!";
  }
};

console.log("Number context (valueOf returns object, falls back to toString):");
console.log("Result:", Number(confusing));

// ============================================
// PART 8: HOW TO CHANGE THE CALL ORDER
// ============================================
console.log("\n--- PART 8: Changing Call Order ---\n");

/*
YOU CAN CHANGE THE CALL ORDER using Symbol.toPrimitive

Symbol.toPrimitive is a special method that takes PRIORITY over 
valueOf() and toString(). It receives a "hint" parameter:
- "string" - wants a string
- "number" - wants a number  
- "default" - no preference
*/

let customOrder = {
  [Symbol.toPrimitive](hint) {
    console.log(`  → Symbol.toPrimitive called with hint: "${hint}"`);
    
    if (hint === "string") {
      return "String representation";
    }
    if (hint === "number") {
      return 42;
    }
    // default
    return "Default representation";
  },
  
  valueOf() {
    console.log("  → valueOf() NOT CALLED (toPrimitive has priority)");
    return 999;
  },
  
  toString() {
    console.log("  → toString() NOT CALLED (toPrimitive has priority)");
    return "This won't be used";
  }
};

console.log("String context:");
console.log("Result:", String(customOrder));

console.log("\nNumber context:");
console.log("Result:", Number(customOrder));

console.log("\nDefault context:");
console.log("Result:", customOrder + "");

// ============================================
// PART 9: PRACTICAL EXAMPLES
// ============================================
console.log("\n--- PART 9: Practical Examples ---\n");

// Example 1: Temperature class
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  
  valueOf() {
    return this.celsius;  // For comparisons and math
  }
  
  toString() {
    return `${this.celsius}°C`;  // For display
  }
}

let temp1 = new Temperature(25);
let temp2 = new Temperature(30);

console.log("Display temp:", "Today: " + temp1);        // "Today: 25°C"
console.log("Compare temps:", temp2 > temp1);           // true
console.log("Average temp:", (temp1 + temp2) / 2);      // 27.5

// Example 2: ID Generator with custom behavior
class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
  
  valueOf() {
    return this.id;  // Use ID for comparisons
  }
  
  toString() {
    return this.name;  // Show name for display
  }
  
  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return `User: ${this.name} (ID: ${this.id})`;
    }
    return this.id;  // For number and default
  }
}

let user1 = new User("Alice", 101);
let user2 = new User("Bob", 102);

console.log("Display user:", "Hello " + user1);         // Uses toPrimitive
console.log("Compare IDs:", user2 > user1);             // Uses toPrimitive → id
console.log("Array lookup:", [user1, user2][0]);        // Shows object

// Example 3: Smart Counter
class SmartCounter {
  constructor(start = 0) {
    this.value = start;
    this.history = [];
  }
  
  valueOf() {
    return this.value;
  }
  
  toString() {
    return `Counter: ${this.value} (history: ${this.history.join(', ')})`;
  }
  
  increment() {
    this.value++;
    this.history.push(this.value);
    return this;
  }
}

let counter2 = new SmartCounter(10);
counter2.increment().increment().increment();

console.log("Show counter:", String(counter2));
console.log("Use in math:", counter2 + 5);
console.log("Compare:", counter2 > 10);

// ============================================
// PART 10: COMMON MISTAKES AND GOTCHAS
// ============================================
console.log("\n--- PART 10: Common Mistakes ---\n");

// Mistake 1: Returning wrong type
let mistake1 = {
  toString() {
    return 123;  // Returns number, not string! (But JavaScript converts it)
  }
};
console.log("toString returns number:", String(mistake1));  // "123"

// Mistake 2: valueOf returning object
let mistake2 = {
  valueOf() {
    return { value: 42 };  // Returns object! Falls back to toString
  },
  toString() {
    return "Fallback string";
  }
};
console.log("valueOf returns object:", Number(mistake2));  // NaN (from "Fallback string")

// Mistake 3: Not understanding Date behavior
let date2 = new Date("2024-11-24");
console.log("Date + 0:", date2 + 0);           // String! (uses toString)
console.log("Date - 0:", date2 - 0);           // Number! (uses valueOf)
console.log("Why? Date treats + as string context");

// ============================================
// SUMMARY
// ============================================
console.log("\n=== SUMMARY ===\n");

console.log(`
KEY POINTS:

1. WHO CALLS THEM?
   → JavaScript automatically, during type coercion

2. WHERE USED?
   → toString: String contexts (concatenation, templates)
   → valueOf: Number contexts (math, comparisons)

3. HOW THEY WORK?
   → Convert objects to primitives for operations

4. WHY NEEDED?
   → Make objects work in primitive contexts
   → Provide meaningful representations

5. CALL ORDER?
   → String context: toString() first, then valueOf()
   → Number context: valueOf() first, then toString()

6. CHANGE ORDER?
   → Use Symbol.toPrimitive (takes priority over both)

REMEMBER:
- Always return primitives from these methods
- Use toString() for human-readable display
- Use valueOf() for numeric value
- Use Symbol.toPrimitive for full control
`);
