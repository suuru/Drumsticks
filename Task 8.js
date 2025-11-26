// ============================================
// CUSTOM IMPLEMENTATIONS OF NATIVE METHODS
// ============================================
// TASK 8
// ======

console.log("=== TESTING CUSTOM METHOD IMPLEMENTATIONS ===\n");

// ============================================
// 1. CUSTOM parseInteger(str, radix)
// ============================================


function parseInteger(str, radix) {
  // Convert to string if not already
  if (typeof str !== 'string') {
    str = String(str);
  }
  
  // Default radix is 10
  if (radix === undefined) {
    radix = 10;
  } else {
    // Convert radix to number manually
    radix = toNumber(radix);
    // Check if radix is valid
    if (radix !== radix || radix < 2 || radix > 36) {
      return NaN;
    }
    // Convert to integer
    radix = radix | 0;
  }
  
  // Trim leading whitespace manually
  let i = 0;
  while (i < str.length && isWhitespace(str[i])) {
    i++;
  }
  
  // Check for sign
  let sign = 1;
  if (i < str.length && str[i] === '-') {
    sign = -1;
    i++;
  } else if (i < str.length && str[i] === '+') {
    i++;
  }
  
  // Handle hex prefix (0x or 0X) when radix is 16 or undefined/0
  if (radix === 16 || radix === 0) {
    if (i + 1 < str.length && str[i] === '0' && (str[i + 1] === 'x' || str[i + 1] === 'X')) {
      i += 2;
      radix = 16;
    }
  }
  
  // If radix is still 0, set to 10
  if (radix === 0) {
    radix = 10;
  }
  
  // Parse the number
  let result = 0;
  let hasDigits = false;
  
  while (i < str.length) {
    const char = str[i];
    const digit = charToDigit(char);
    
    // Check if digit is valid for this radix
    if (digit === -1 || digit >= radix) {
      break;
    }
    
    hasDigits = true;
    result = result * radix;
    result = result + digit;
    i++;
  }
  
  // Return NaN if no valid digits found
  if (!hasDigits) {
    return NaN;
  }
  
  return sign * result;
}

// Helper: Check if character is whitespace
function isWhitespace(char) {
  return char === ' ' || char === '\t' || char === '\n' || 
         char === '\r' || char === '\f' || char === '\v';
}

// Helper: Convert character to digit value
function charToDigit(char) {
  const code = char.charCodeAt(0);
  
  // 0-9
  if (code >= 48 && code <= 57) {
    return code - 48;
  }
  // A-Z
  if (code >= 65 && code <= 90) {
    return code - 65 + 10;
  }
  // a-z
  if (code >= 97 && code <= 122) {
    return code - 97 + 10;
  }
  
  return -1;
}

// Helper: Convert value to number without using Number()
function toNumber(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (value === null) {
    return 0;
  }
  if (value === undefined) {
    return NaN;
  }
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (typeof value === 'string') {
    // For radix conversion, we need a basic number parser
    // This is a simplified version - just return NaN for non-numeric
    let result = 0;
    let i = 0;
    let sign = 1;
    
    // Skip whitespace
    while (i < value.length && isWhitespace(value[i])) {
      i++;
    }
    
    // Check sign
    if (i < value.length && value[i] === '-') {
      sign = -1;
      i++;
    } else if (i < value.length && value[i] === '+') {
      i++;
    }
    
    // Parse digits
    let hasDigits = false;
    while (i < value.length) {
      const code = value.charCodeAt(i);
      if (code >= 48 && code <= 57) {
        result = result * 10 + (code - 48);
        hasDigits = true;
      } else {
        break;
      }
      i++;
    }
    
    return hasDigits ? sign * result : NaN;
  }
  return NaN;
}

// ============================================
// 2. CUSTOM includes(text, matchStr, index)
// ============================================

function includes(text, matchStr, index) {
  // Convert to string if not already
  if (typeof text !== 'string') {
    text = String(text);
  }
  if (typeof matchStr !== 'string') {
    matchStr = String(matchStr);
  }
  
  // Handle index parameter
  if (index === undefined) {
    index = 0;
  } else {
    // Convert index to number manually
    if (typeof index === 'number') {
      // Handle NaN
      if (index !== index) {
        index = 0;
      } else {
        // Convert to integer
        index = index | 0;
      }
    } else {
      index = 0;
    }
  }
  
  // Handle negative index (converts to 0)
  if (index < 0) {
    index = 0;
  }
  
  // If matchStr is empty, always return true (unless index > length)
  if (matchStr.length === 0) {
    return index <= text.length;
  }
  
  // If starting index is beyond text length, return false
  if (index >= text.length) {
    return false;
  }
  
  // Search for matchStr starting from index
  const maxStart = text.length - matchStr.length;
  
  for (let i = index; i <= maxStart; i++) {
    let found = true;
    
    // Check if matchStr matches at position i
    for (let j = 0; j < matchStr.length; j++) {
      if (text[i + j] !== matchStr[j]) {
        found = false;
        break;
      }
    }
    
    if (found) {
      return true;
    }
  }
  
  return false;
}

// ============================================
// 3. CUSTOM split(text, divider, limit)
// ============================================

function split(text, divider, limit) {
  // Convert to string if not already
  if (typeof text !== 'string') {
    text = String(text);
  }
  
  const result = [];
  
  // Handle undefined divider - return array with whole string
  if (divider === undefined) {
    result[result.length] = text;
    return result;
  }
  
  // Convert divider to string
  if (typeof divider !== 'string') {
    divider = String(divider);
  }
  
  // Handle limit
  let hasLimit = false;
  let maxItems = 0;
  if (limit !== undefined) {
    if (typeof limit === 'number') {
      if (limit !== limit) {
        // NaN treated as 0
        hasLimit = true;
        maxItems = 0;
      } else {
        hasLimit = true;
        maxItems = limit < 0 ? 0 : (limit | 0);
      }
    }
  }
  
  // If limit is 0, return empty array
  if (hasLimit && maxItems === 0) {
    return result;
  }
  
  // Handle empty string divider - split every character
  if (divider.length === 0) {
    for (let i = 0; i < text.length; i++) {
      if (hasLimit && result.length >= maxItems) {
        break;
      }
      result[result.length] = text[i];
    }
    return result;
  }
  
  // Handle empty text
  if (text.length === 0) {
    result[result.length] = '';
    return result;
  }
  
  // Perform the split
  let currentStart = 0;
  let i = 0;
  
  while (i <= text.length - divider.length) {
    // Check if divider matches at position i
    let matches = true;
    for (let j = 0; j < divider.length; j++) {
      if (text[i + j] !== divider[j]) {
        matches = false;
        break;
      }
    }
    
    if (matches) {
      // Extract substring from currentStart to i
      let part = '';
      for (let k = currentStart; k < i; k++) {
        part = part + text[k];
      }
      result[result.length] = part;
      
      // Check limit
      if (hasLimit && result.length >= maxItems) {
        return result;
      }
      
      // Move past the divider
      i = i + divider.length;
      currentStart = i;
    } else {
      i++;
    }
  }
  
  // Add the remaining part
  let lastPart = '';
  for (let k = currentStart; k < text.length; k++) {
    lastPart = lastPart + text[k];
  }
  result[result.length] = lastPart;
  
  return result;
}

// ============================================
// TESTING SECTION
// ============================================

console.log("--- TEST 1: parseInteger ---\n");

// Basic tests
console.log("parseInteger('123'):", parseInteger('123'));
console.log("Native parseInt('123'):", parseInt('123'));

console.log("\nparseInteger('  456  '):", parseInteger('  456  '));
console.log("Native parseInt('  456  '):", parseInt('  456  '));

console.log("\nparseInteger('-789'):", parseInteger('-789'));
console.log("Native parseInt('-789'):", parseInt('-789'));

console.log("\nparseInteger('42px'):", parseInteger('42px'));
console.log("Native parseInt('42px'):", parseInt('42px'));

console.log("\nparseInteger('abc'):", parseInteger('abc'));
console.log("Native parseInt('abc'):", parseInt('abc'));

console.log("\nparseInteger('0xFF', 16):", parseInteger('0xFF', 16));
console.log("Native parseInt('0xFF', 16):", parseInt('0xFF', 16));

console.log("\nparseInteger('1010', 2):", parseInteger('1010', 2));
console.log("Native parseInt('1010', 2):", parseInt('1010', 2));

console.log("\nparseInteger('77', 8):", parseInteger('77', 8));
console.log("Native parseInt('77', 8):", parseInt('77', 8));

console.log("\nparseInteger(''):", parseInteger(''));
console.log("Native parseInt(''):", parseInt(''));

console.log("\nparseInteger(null):", parseInteger(null));
console.log("Native parseInt(null):", parseInt(null));

console.log("\n--- TEST 2: includes ---\n");

// Basic tests
console.log("includes('hello world', 'world'):", includes('hello world', 'world'));
console.log("Native 'hello world'.includes('world'):", 'hello world'.includes('world'));

console.log("\nincludes('hello world', 'World'):", includes('hello world', 'World'));
console.log("Native 'hello world'.includes('World'):", 'hello world'.includes('World'));

console.log("\nincludes('hello world', 'o', 5):", includes('hello world', 'o', 5));
console.log("Native 'hello world'.includes('o', 5):", 'hello world'.includes('o', 5));

console.log("\nincludes('hello', ''):", includes('hello', ''));
console.log("Native 'hello'.includes(''):", 'hello'.includes(''));

console.log("\nincludes('hello', 'x'):", includes('hello', 'x'));
console.log("Native 'hello'.includes('x'):", 'hello'.includes('x'));

console.log("\nincludes('test', 'test', 1):", includes('test', 'test', 1));
console.log("Native 'test'.includes('test', 1):", 'test'.includes('test', 1));

console.log("\nincludes('abcabc', 'abc', 1):", includes('abcabc', 'abc', 1));
console.log("Native 'abcabc'.includes('abc', 1):", 'abcabc'.includes('abc', 1));

console.log("\nincludes('hello', '', 10):", includes('hello', '', 10));
console.log("Native 'hello'.includes('', 10):", 'hello'.includes('', 10));

console.log("\n--- TEST 3: split ---\n");

// Basic tests
console.log("split('a,b,c', ','):", split('a,b,c', ','));
console.log("Native 'a,b,c'.split(','):", 'a,b,c'.split(','));

console.log("\nsplit('hello', ''):", split('hello', ''));
console.log("Native 'hello'.split(''):", 'hello'.split(''));

console.log("\nsplit('test', undefined):", split('test', undefined));
console.log("Native 'test'.split(undefined):", 'test'.split(undefined));

console.log("\nsplit('one-two-three', '-'):", split('one-two-three', '-'));
console.log("Native 'one-two-three'.split('-'):", 'one-two-three'.split('-'));

console.log("\nsplit('a,b,c', ',', 2):", split('a,b,c', ',', 2));
console.log("Native 'a,b,c'.split(',', 2):", 'a,b,c'.split(',', 2));

console.log("\nsplit('', ','):", split('', ','));
console.log("Native ''.split(','):", ''.split(','));

console.log("\nsplit('no-divider', 'x'):", split('no-divider', 'x'));
console.log("Native 'no-divider'.split('x'):", 'no-divider'.split('x'));

console.log("\nsplit('aa', 'aa'):", split('aa', 'aa'));
console.log("Native 'aa'.split('aa'):", 'aa'.split('aa'));

console.log("\nsplit('hello', '', 3):", split('hello', '', 3));
console.log("Native 'hello'.split('', 3):", 'hello'.split('', 3));

console.log("\nsplit('a::b::c', '::'):", split('a::b::c', '::'));
console.log("Native 'a::b::c'.split('::'):", 'a::b::c'.split('::'));

// ============================================
// EDGE CASE TESTS
// ============================================

console.log("\n--- EDGE CASE TESTS ---\n");

console.log("parseInteger('+100'):", parseInteger('+100'));
console.log("Native parseInt('+100'):", parseInt('+100'));

console.log("\nparseInteger('  -0  '):", parseInteger('  -0  '));
console.log("Native parseInt('  -0  '):", parseInt('  -0  '));

console.log("\nparseInteger('0x10'):", parseInteger('0x10'));
console.log("Native parseInt('0x10'):", parseInt('0x10'));

console.log("\nincludes('', '', 0):", includes('', '', 0));
console.log("Native ''.includes('', 0):", ''.includes('', 0));

console.log("\nincludes('abc', 'abc', -1):", includes('abc', 'abc', -1));
console.log("Native 'abc'.includes('abc', -1):", 'abc'.includes('abc', -1));

console.log("\nsplit('test', '', 0):", split('test', '', 0));
console.log("Native 'test'.split('', 0):", 'test'.split('', 0));

console.log("\nsplit('aaaaa', 'aa'):", split('aaaaa', 'aa'));
console.log("Native 'aaaaa'.split('aa'):", 'aaaaa'.split('aa'));

console.log("\n=== ALL TESTS COMPLETED ===");