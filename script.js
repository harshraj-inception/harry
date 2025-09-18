document.addEventListener('DOMContentLoaded', () => {
    // Caesar Cipher Logic
    const caesarInput = document.getElementById('caesar-input');
    const caesarShift = document.getElementById('caesar-shift');
    const caesarOutput = document.getElementById('caesar-output');
    const caesarEncryptBtn = document.getElementById('caesar-encrypt-btn');
    const caesarDecryptBtn = document.getElementById('caesar-decrypt-btn');

    const caesarCipher = (text, shift, isEncrypt) => {
        let result = '';
        const effectiveShift = isEncrypt ? shift : (26 - shift) % 26;

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let isUpperCase = char === char.toUpperCase();

            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt(0);
                let base = isUpperCase ? 65 : 97;
                let shiftedCode = ((code - base + effectiveShift) % 26) + base;
                char = String.fromCharCode(shiftedCode);
            }
            result += char;
        }
        return result;
    };

    const updateCaesar = (isEncrypt) => {
        const text = caesarInput.value;
        const shift = parseInt(caesarShift.value, 10);
        if (text && !isNaN(shift)) {
            caesarOutput.textContent = caesarCipher(text, shift, isEncrypt);
        } else {
            caesarOutput.textContent = '';
        }
    };

    caesarEncryptBtn.addEventListener('click', () => updateCaesar(true));
    caesarDecryptBtn.addEventListener('click', () => updateCaesar(false));

    // Vigenère Cipher Logic
    const vigenereInput = document.getElementById('vigenere-input');
    const vigenereKeyword = document.getElementById('vigenere-keyword');
    const vigenereOutput = document.getElementById('vigenere-output');
    const vigenereEncryptBtn = document.getElementById('vigenere-encrypt-btn');
    const vigenereDecryptBtn = document.getElementById('vigenere-decrypt-btn');

    const vigenereCipher = (text, keyword, isEncrypt) => {
        keyword = keyword.toLowerCase().replace(/[^a-z]/g, '');
        if (!keyword) return text;
        
        let result = '';
        let keywordIndex = 0;

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let isUpperCase = char === char.toUpperCase();

            if (char.match(/[a-z]/i)) {
                let textCode = char.charCodeAt(0);
                let keywordCode = keyword.charCodeAt(keywordIndex % keyword.length) - 97;
                let base = isUpperCase ? 65 : 97;
                
                let shiftedCode;
                if (isEncrypt) {
                    shiftedCode = ((textCode - base + keywordCode) % 26) + base;
                } else {
                    shiftedCode = ((textCode - base - keywordCode + 26) % 26) + base;
                }
                
                result += String.fromCharCode(shiftedCode);
                keywordIndex++;
            } else {
                result += char;
            }
        }
        return result;
    };

    const updateVigenere = (isEncrypt) => {
        const text = vigenereInput.value;
        const keyword = vigenereKeyword.value;
        if (text && keyword) {
            vigenereOutput.textContent = vigenereCipher(text, keyword, isEncrypt);
        } else {
            vigenereOutput.textContent = '';
        }
    };

    vigenereEncryptBtn.addEventListener('click', () => updateVigenere(true));
    vigenereDecryptBtn.addEventListener('click', () => updateVigenere(false));
});