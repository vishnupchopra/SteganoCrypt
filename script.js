// Global variables
let currentMode = 'encode';
let coverImageData = null;
let encodedImageData = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('SteganoCrypt initialized successfully!');
});

/**
 * Switch between encode and decode modes
 * @param {string} mode - The mode to switch to ('encode' or 'decode')
 */
function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Switch tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(mode + '-tab').classList.add('active');
}

/**
 * Handle cover image file selection for encoding
 * @param {HTMLInputElement} input - The file input element
 */
function handleCoverImage(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById('cover-img');
            img.src = e.target.result;
            document.getElementById('cover-preview').classList.add('show');
            document.getElementById('cover-button').classList.add('has-file');
            document.getElementById('cover-button').innerHTML = `✅ ${file.name}`;
            
            // Load image data for processing
            const image = new Image();
            image.onload = function() {
                coverImageData = {
                    element: image,
                    width: image.width,
                    height: image.height
                };
            };
            image.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
}

/**
 * Handle encoded image file selection for decoding
 * @param {HTMLInputElement} input - The file input element
 */
function handleEncodedImage(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById('encoded-img');
            img.src = e.target.result;
            document.getElementById('encoded-preview').classList.add('show');
            document.getElementById('encoded-button').classList.add('has-file');
            document.getElementById('encoded-button').innerHTML = `✅ ${file.name}`;
            
            // Load image data for processing
            const image = new Image();
            image.onload = function() {
                encodedImageData = {
                    element: image,
                    width: image.width,
                    height: image.height
                };
            };
            image.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
}

/**
 * Convert string to binary representation
 * @param {string} str - The string to convert
 * @returns {string} - Binary representation
 */
function stringToBinary(str) {
    return str.split('').map(char => 
        char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('');
}

/**
 * Convert binary string to text
 * @param {string} binary - The binary string to convert
 * @returns {string} - The decoded text
 */
function binaryToString(binary) {
    const bytes = binary.match(/.{8}/g);
    return bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}

/**
 * Simple XOR encryption/decryption
 * @param {string} text - The text to encrypt/decrypt
 * @param {string} password - The password to use
 * @returns {string} - The encrypted/decrypted text
 */
function simpleEncrypt(text, password) {
    if (!password) return text;
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyCode = password.charCodeAt(i % password.length);
        result += String.fromCharCode(charCode ^ keyCode);
    }
    return result;
}

/**
 * Simple XOR decryption (same as encryption for XOR)
 * @param {string} encryptedText - The encrypted text
 * @param {string} password - The password to use
 * @returns {string} - The decrypted text
 */
function simpleDecrypt(encryptedText, password) {
    return simpleEncrypt(encryptedText, password); // XOR is its own inverse
}

/**
 * Encode a message into an image using LSB steganography
 */
function encodeMessage() {
    if (!coverImageData) {
        alert('Please select a cover image first!');
        return;
    }

    const message = document.getElementById('secret-message').value;
    const password = document.getElementById('encode-password').value;

    if (!message.trim()) {
        alert('Please enter a message to hide!');
        return;
    }

    try {
        // Encrypt message if password provided
        const processedMessage = password ? simpleEncrypt(message, password) : message;
        
        // Add delimiter to mark end of message
        const messageWithDelimiter = processedMessage + '###END###';
        const binaryMessage = stringToBinary(messageWithDelimiter);

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = coverImageData.width;
        canvas.height = coverImageData.height;
        
        ctx.drawImage(coverImageData.element, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Check if image is large enough
        const availablePixels = (data.length / 4) * 3; // 3 color channels per pixel
        if (binaryMessage.length > availablePixels) {
            alert('Image is too small to hide this message!');
            return;
        }

        // Hide message in LSB of RGB channels
        let messageIndex = 0;
        for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
            // Process R, G, B channels (skip alpha)
            for (let channel = 0; channel < 3 && messageIndex < binaryMessage.length; channel++) {
                const pixelIndex = i + channel;
                const bit = binaryMessage[messageIndex];
                
                // Modify LSB
                data[pixelIndex] = (data[pixelIndex] & 0xFE) | parseInt(bit);
                messageIndex++;
            }
        }

        ctx.putImageData(imageData, 0, 0);
        
        document.getElementById('encode-result').style.display = 'block';
        document.getElementById('encode-result').className = 'result-area success';
        
    } catch (error) {
        document.getElementById('encode-result').style.display = 'block';
        document.getElementById('encode-result').className = 'result-area error';
        document.getElementById('encode-result').innerHTML = '<h3>❌ Encoding Failed</h3><p>' + error.message + '</p>';
    }
}

/**
 * Decode a message from an image using LSB steganography
 */
function decodeMessage() {
    if (!encodedImageData) {
        alert('Please select an encoded image first!');
        return;
    }

    const password = document.getElementById('decode-password').value;

    try {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = encodedImageData.width;
        canvas.height = encodedImageData.height;
        
        ctx.drawImage(encodedImageData.element, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let binaryMessage = '';
        let foundEnd = false;

        // Extract LSBs from RGB channels
        for (let i = 0; i < data.length && !foundEnd; i += 4) {
            for (let channel = 0; channel < 3; channel++) {
                const pixelIndex = i + channel;
                const bit = data[pixelIndex] & 1;
                binaryMessage += bit;

                // Check for end delimiter every 8 bits
                if (binaryMessage.length % 8 === 0) {
                    const currentMessage = binaryToString(binaryMessage);
                    if (currentMessage.includes('###END###')) {
                        foundEnd = true;
                        break;
                    }
                }
            }
        }

        if (!foundEnd) {
            throw new Error('No hidden message found or message is corrupted');
        }

        let decodedMessage = binaryToString(binaryMessage);
        decodedMessage = decodedMessage.split('###END###')[0];

        // Decrypt if password provided
        if (password) {
            decodedMessage = simpleDecrypt(decodedMessage, password);
        }

        document.getElementById('decode-result').style.display = 'block';
        document.getElementById('decode-result').className = 'result-area success';
        document.getElementById('decoded-message').textContent = decodedMessage;

    } catch (error) {
        document.getElementById('decode-result').style.display = 'block';
        document.getElementById('decode-result').className = 'result-area error';
        document.getElementById('decode-result').innerHTML = '<h3>❌ Decoding Failed</h3><p>' + error.message + '</p>';
    }
}

/**
 * Download the encoded image
 */
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'steganocrypt-encoded.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}