const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const mainContainer = document.getElementById('main-container');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const logoutOption = document.getElementById('logout-option');

const menuOptions = document.querySelectorAll('.menu-option');
const contentSections = document.querySelectorAll('.content-section');

const generateKeysBtn = document.getElementById('generate-keys-btn');
const keysNotification = document.getElementById('keys-notification');

const encryptBtn = document.getElementById('encrypt-btn');
const plaintext = document.getElementById('plaintext');
const encryptedText = document.getElementById('encrypted-text');

const decryptBtn = document.getElementById('decrypt-btn');
const decryptedText = document.getElementById('decrypted-text');

let crypt = new JSEncrypt();
let privateKey = localStorage.getItem('privateKey');
let publicKey = localStorage.getItem('publicKey');
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

// Mostrar/ocultar formularios de inicio de sesión y registro
registerLink.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

loginLink.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// funcionalidad de registrar he iniciar sesion
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = registeredUsers.find(user => user.username === username && user.password === password);

    if (user) {
        // inicio de sesion exitoso 
        loginForm.style.display = 'none';
        mainContainer.style.display = 'flex';
    } else {
        alert('Credenciales inválidas. Por favor, regístrate primero.');
    }
});

registerBtn.addEventListener('click', () => {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const existingUser = registeredUsers.find(user => user.username === username);

    if (existingUser) {
        alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
    } else {
        registeredUsers.push({ username, password });
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
    }
});

// opcion del menu
menuOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        contentSections.forEach(section => section.style.display = 'none');

        const targetSection = document.getElementById(`${e.target.id.replace('-option', '')}-content`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

// funcionalidad del cierre de sesion
logoutOption.addEventListener('click', (e) => {
    e.preventDefault();
    mainContainer.style.display = 'none';
    loginForm.style.display = 'block';
});

// funcionalidad de generacion de llaves
generateKeysBtn.addEventListener('click', () => {
    crypt = new JSEncrypt();
    const keyPair = crypt.getKey();
    privateKey = keyPair.privateKey;
    publicKey = keyPair.publicKey;

    // Almacenar claves en localStorage
    localStorage.setItem('privateKey', privateKey);
    localStorage.setItem('publicKey', publicKey);

    keysNotification.style.display = 'block';
    setTimeout(() => {
        keysNotification.style.display = 'none';
    }, 3000);
});

// ENCRIPTACION
encryptBtn.addEventListener('click', () => {
    const plainText = plaintext.value;
    if (plainText) {
        const encrypted = crypt.encrypt(plainText);
        encryptedText.textContent = `Texto encriptado: ${encrypted}`;
        encryptedText.style.display = 'block';
    } else {
        encryptedText.textContent = 'Ingrese el texto a encriptar.';
        encryptedText.style.display = 'block';
    }
});
// DESENCRIPTACION
decryptBtn.addEventListener('click', () => {
    // Retrieve private key from localStorage
    privateKey = localStorage.getItem('privateKey');
    publicKey = localStorage.getItem('publicKey');

    if (privateKey) {
        crypt.setPrivateKey(privateKey);
        const encryptedMessage = encryptedText.textContent.replace('Texto encriptado: ', '');
        if (encryptedMessage) {
            try {
                const decrypted = crypt.decrypt(encryptedMessage);
                decryptedText.textContent = `Texto desencriptado: ${decrypted}`;
                decryptedText.style.display = 'block';
            } catch (error) {
                decryptedText.textContent = 'Error al desencriptar el mensaje.';
                decryptedText.style.display = 'block';
                console.error('Error al desencriptar:', error);
            }
        } else {
            decryptedText.textContent = 'No hay texto cifrado para desencriptar.';
            decryptedText.style.display = 'block';
        }
    } else {
        decryptedText.textContent = 'Primero debe generar las llaves.';
        decryptedText.style.display = 'block';
    }
});
