document.addEventListener('DOMContentLoaded', () => {
    // Caesar Cipher Logic
    const caesarInput = document.getElementById('caesar-input');
    const caesarShift = document.getElementById('caesar-shift');
    const caesarOutput = document.getElementById('caesar-output');

    const encryptCaesar = (text, shift) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let isUpperCase = char === char.toUpperCase();
            
            if (char.match(/[a-z]/i)) {
                let code = char.charCodeAt(0);
                let base = isUpperCase ? 65 : 97;
                let shiftedCode = ((code - base + shift) % 26) + base;
                char = String.fromCharCode(shiftedCode);
            }
            result += char;
        }
        return result;
    };

    const updateCaesar = () => {
        const text = caesarInput.value;
        const shift = parseInt(caesarShift.value, 10);
        if (text && !isNaN(shift)) {
            caesarOutput.textContent = encryptCaesar(text, shift);
        } else {
            caesarOutput.textContent = '';
        }
    };

    caesarInput.addEventListener('input', updateCaesar);
    caesarShift.addEventListener('input', updateCaesar);

    // Vigenère Cipher Logic
    const vigenereInput = document.getElementById('vigenere-input');
    const vigenereKeyword = document.getElementById('vigenere-keyword');
    const vigenereOutput = document.getElementById('vigenere-output');

    const encryptVigenere = (text, keyword) => {
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
                let shiftedCode = ((textCode - base + keywordCode) % 26) + base;
                result += String.fromCharCode(shiftedCode);
                keywordIndex++;
            } else {
                result += char;
            }
        }
        return result;
    };

    const updateVigenere = () => {
        const text = vigenereInput.value;
        const keyword = vigenereKeyword.value;
        if (text && keyword) {
            vigenereOutput.textContent = encryptVigenere(text, keyword);
        } else {
            vigenereOutput.textContent = '';
        }
    };

    vigenereInput.addEventListener('input', updateVigenere);
    vigenereKeyword.addEventListener('input', updateVigenere);
});