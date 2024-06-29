function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    return password;
}

function updatePasswordField(password) {
    document.getElementById('password').value = password;
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Password copied to clipboard!');
}

function handleGeneratePasswordButtonClick() {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);
    updatePasswordField(password);
    copyToClipboard(password);
}

function handleQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('length')) {
        const length = parseInt(urlParams.get('length'));
        const includeUppercase = urlParams.get('includeUppercase') === 'true';
        const includeNumbers = urlParams.get('includeNumbers') === 'true';
        const includeSymbols = urlParams.get('includeSymbols') === 'true';

        const password = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);

        // Return the password as a JSON response
        document.body.innerHTML = ''; // Clear the body content
        const jsonResponse = JSON.stringify({ password });
        document.body.textContent = jsonResponse;

        // Set the correct content type for the response
        document.body.setAttribute('content-type', 'application/json');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    handleQueryParams();
    if (!new URLSearchParams(window.location.search).has('length')) {
        document.querySelector('button').addEventListener('click', handleGeneratePasswordButtonClick);
    }
});
