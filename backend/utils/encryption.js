
const crypto = require('crypto');

const AES_SECRET = process.env.AES_SECRET || "a9f3b1c7d5e2f8a0c4b6d7e9f1a2b3c4";

// Ensure the secret is exactly 32 characters
const getValidSecret = () => {
      // Check if AES_SECRET is defined
    if (!AES_SECRET) {
        console.error('❌ AES_SECRET is not defined in environment variables');
        console.error('💡 Please add AES_SECRET=your-32-character-key to your .env file');
        throw new Error('Encryption key not configured');
    }
    if (AES_SECRET.length >= 32) {
        return AES_SECRET.slice(0, 32);
    } else {
        // Pad with zeros if too short
        return AES_SECRET.padEnd(32, '0');
    }
};

const encrypt = (text) => {
    try {
        // Handle empty/null/undefined values - return empty string
        if (text === null || text === undefined || text === '') {
            return '';
        }
        
        // Convert to string
        const textString = text.toString();
        
        // Don't encrypt empty strings
        if (textString.trim() === '') {
            return '';
        }
        const secret = getValidSecret();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv);
        
        let encrypted = cipher.update(textString, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Encryption error for text:', text, error);
        console.error("Text that failed:",text);
        throw new Error(`Encryption failed: ${error.message}`);
    }
};

const decrypt = (encryptedText) => {
    try {
        // Handle empty strings
        if (!encryptedText || encryptedText === '') {
            return '';
        }
        const secret = getValidSecret();
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encrypted = textParts.join(':');
        
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), iv);
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        // Return empty string on error
        return '';
    }
};


// Test function to verify encryption is working
const testEncryption = () => {
    try {
        const testText = "Test encryption";
        const encrypted = encrypt(testText);
        const decrypted = decrypt(encrypted);
        
        console.log('🔐 Encryption test:');
        console.log('Original:', testText);
        console.log('Encrypted:', encrypted);
        console.log('Decrypted:', decrypted);
        console.log('Success:', testText === decrypted);
        
        return testText === decrypted;
    } catch (error) {
        console.error('❌ Encryption test failed:', error.message);
        return false;
    }
};


module.exports = { encrypt, decrypt , testEncryption};