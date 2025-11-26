function extractAmount(text) {
    let amount = '';
    
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        
        // Check if character is a digit (0-9)
        if (charCode >= 48 && charCode <= 57) {
            amount += text[i];
        }
        // If we have digits and encounter non-digit, we're done
        else if (amount.length > 0) {
            break;
        }
    }
    
    return amount ? parseInt(amount, 10) : 0;
}
