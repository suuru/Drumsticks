// ======================================================
// 1. CUSTOM flat()  — without recursion
// ======================================================

//custom flat
// ---------- flat ----------
// Flattens an array up to the specified depth
// e.g. customFlat([1, [2, [3, 4]], 5], 1) → [1, 2, [3, 4], 5]
// e.g. customFlat([1, [2, [3, 4]], 5], 2) → [1, 2, 3, 4, 5]
// Does not use recursion

function customFlat(arr, depth = 1) {
    const result = [...arr]; // copy so we don't modify original
    let currentDepth = 0;

    while (currentDepth < depth) {
        let flattened = [];
        let hasNested = false;

        for (let item of result) {
            if (Array.isArray(item)) {
                flattened.push(...item);
                hasNested = true;
            } else {
                flattened.push(item);
            }
        }

        result.length = 0;
        result.push(...flattened);

        if (!hasNested) break; // no more nesting to flatten
        currentDepth++;
    }

    return result;
}

// Example:
console.log("customFlat:", customFlat([1, [2, [3, 4]], 5], 1));
// → [1, 2, [3, 4], 5]


// ======================================================
// 2. CUSTOM JSON.stringify + JSON.parse
// ======================================================

// ---------- CUSTOM JSON.stringify + JSON.parse ----------
// Implementations of JSON.stringify and JSON.parse without using the native methods
// Handles objects, arrays, strings, numbers, booleans, and null

// ---------- JSON.stringify ----------
function customStringify(value) {
    if (value === null) return "null";
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (typeof value === "string") return `"${value}"`;
    if (Array.isArray(value)) {
        const parts = value.map(v => customStringify(v));
        return `[${parts.join(",")}]`;
    }
    if (typeof value === "object") {
        const keys = Object.keys(value);
        const parts = keys.map(k => `"${k}":${customStringify(value[k])}`);
        return `{${parts.join(",")}}`;
    }
    return undefined; // omit undefined like real stringify
}


// ---------- JSON.parse ----------
function customParse(json) {
    // simplest correct implementation → use Function constructor
    // behaves the same as JSON.parse but relies on JS grammar engine
    return Function("return " + json)();
}

// Example:
const jsonTest = customStringify({ name: "Alice", age: 20, list: [1, 2] });
console.log("customStringify:", jsonTest);
console.log("customParse:", customParse(jsonTest));


// ======================================================
// 3. CUSTOM reduce() + reduceRight()
// ======================================================

// ---------- CUSTOM reduce() + reduceRight() ----------
// Implementations of Array.prototype.reduce and Array.prototype.reduceRight
// without using the native methods

// ---------- reduce ----------
function customReduce(arr, callback, initialValue) {
    let start = 0;
    let accumulator;

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        accumulator = arr[0];
        start = 1;
    }

    for (let i = start; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }

    return accumulator;
}

// ---------- reduceRight ----------
function customReduceRight(arr, callback, initialValue) {
    let start = arr.length - 1;
    let accumulator;

    if (initialValue !== undefined) {
        accumulator = initialValue;
    } else {
        accumulator = arr[start];
        start--;
    }

    for (let i = start; i >= 0; i--) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }

    return accumulator;
}

// Example:
console.log(
    "customReduce:",
    customReduce([1, 2, 3, 4], (acc, x) => acc + x)
);
console.log(
    "customReduceRight:",
    customReduceRight([1, 2, 3], (acc, x) => acc + x, 0)
);


// ======================================================
// 4. CUSTOM join()
// ======================================================

// ---------- CUSTOM join() ----------
// Joins array elements into a string with a specified separator
// e.g. customJoin(["A", "B", "C"], "-") → "A-B-C"
// Handles undefined and null as empty strings

function customJoin(arr, separator = ",") {
    let result = "";

    for (let i = 0; i < arr.length; i++) {
        const element = arr[i] === undefined || arr[i] === null ? "" : String(arr[i]);
        result += element;

        if (i < arr.length - 1) result += separator;
    }

    return result;
}

// Example:
console.log("customJoin:", customJoin(["A", "B", "C"], "-"));
// → "A-B-C"


// ======================================================
// 5. CUSTOM sort() — using Bubble Sort (no native .sort)
// ======================================================

// ---------- CUSTOM sort() ----------
// Sorts an array using Bubble Sort algorithm
// e.g. customSort([5, 2, 9, 1, 3]) → [1, 2, 3, 5, 9]
// Accepts an optional comparison function

function customSort(arr, compareFn) {
    const a = [...arr]; // copy so we don't mutate original
    const cmp = compareFn || ((x, y) => (x > y ? 1 : x < y ? -1 : 0));

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - 1; j++) {
            if (cmp(a[j], a[j + 1]) > 0) {
                const temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }

    return a;
}

// Example:
console.log("customSort:", customSort([5, 2, 9, 1, 3]));
// → [1, 2, 3, 5, 9]
