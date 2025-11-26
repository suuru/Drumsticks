const message = 'My account holds 15000 USDT. I spent 1000 USDT on travel and 2000 USDT on rent';

function computeFunds(text) {
    let balance = 0;
    let currentNumber = '';
    let isReadingNumber = false;
    let isFirstAmount = true; // Track if it's the first amount (income)
    
    // Our 1 for loop
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const char = text[i];
        
        // Check if character is a digit (0-9)
        if (charCode >= 48 && charCode <= 57) {
            currentNumber += char;
            isReadingNumber = true;
        } 
        // Check if we found " USDT" after a number
        else if (isReadingNumber && charCode === 32 && text.charCodeAt(i + 1) === 85) {
            // We found a complete number before USDT
            isReadingNumber = false;
            
            // Convert string to number without parseInt/Number/etc.
            let numberValue = 0;
            for (let j = 0; j < currentNumber.length; j++) {
                const digit = currentNumber.charCodeAt(j) - 48; // Convert '0'->0, '1'->1, etc.
                numberValue = numberValue * 10 + digit;
            }
            
            // First amount is income, others are expenses
            if (isFirstAmount) {
                balance += numberValue;
                isFirstAmount = false;
            } else {
                balance -= numberValue;
            }
            
            currentNumber = '';
            i += 4; // Skip "USDT" (we're at space before U, skip U,S,D,T)
        }
        // If we're reading a number but hit non-digit (not USDT), reset
        else if (isReadingNumber) {
            currentNumber = '';
            isReadingNumber = false;
        }
    }
    
    return balance;
}

console.log(computeFunds(message));
// Output: 12000