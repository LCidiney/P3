const form = document.querySelector(".login");
const buttonLogin = document.querySelector('.btn-login');
const buttonRegister = document.querySelector('.btn-register');
let user;

class User {
    constructor(name, cpf, saldo) {
        this.name = name;
        this.cpf = cpf;
        this.saldo = saldo;
        this.status = "Active";
        this.attempts = 0;
    }
}

buttonLogin.addEventListener('click', function (e) {
    e.preventDefault();
    clicked(e);
});

buttonRegister.addEventListener('click', function (e) {
    e.preventDefault();
    clicked(e);
});

function createUser() {
    try {
        const name = document.querySelector("#name").value.trim();
        const cpf = document.querySelector("#cpf").value;
        const saldo = document.querySelector('#valor').value.trim();
        if (!name || !cpf || !saldo) {
            throw new Error("Por favor, preencha todos os campos!");
        }
        if (!isValidCPF(cpf)) {
            throw new Error("CPF inválido!");
        }
        user = JSON.stringify(new User(name, cpf, saldo));
        localStorage.setItem('user', user);
        if (!accessValidator()) {
            usersRegister();
        } else {
            alert('Usuário já cadastrado!');
        }
    } catch (error) {
        alert(error.message);
    }
}

function loginUser() {
    try {
        const name = document.querySelector("#name").value.trim();
        const cpf = document.querySelector("#cpf").value;
        const saldo = document.querySelector('#valor').value.trim();
        if (!name || !cpf || !saldo) {
            throw new Error("Por favor, preencha todos os campos!");
        }
        if (!isValidCPF(cpf)) {
            throw new Error("CPF inválido");
        }
        const user = JSON.stringify(new User(name, cpf, saldo));
        localStorage.setItem('user', user);
        if (!accessValidator()) {
            alert('Erro no login!');
        } else {
            window.location.href = "../opcoes/index.html";
        }
    } catch (error) {
        alert(error.message);
    }
}

function usersRegister() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = JSON.parse(localStorage.getItem('user'));
    const userExists = users.some(storedUser => {
        const parsedStoredUser = JSON.parse(storedUser);
        if (user.cpf === parsedStoredUser.cpf && parsedStoredUser.status === 'Active') {
            alert('Usuário já cadastrado!');
            return true;
        } else if (user.cpf === parsedStoredUser.cpf && parsedStoredUser.status === 'Blocked') {
            alert('Erro no registro!');
            return true;
        }
        return false;
    });
    if (userExists) {
        return;
    }
    user = JSON.stringify(user);
    localStorage.setItem('user', user);
    users.push(user);
    users = JSON.stringify(users);
    localStorage.setItem("users", users);
    alert("Usuário cadastrado com sucesso!");
}

function accessValidator() {
    const user = JSON.parse(localStorage.getItem('user'));
    const users = JSON.parse(localStorage.getItem('users'));
    if (!!users) {
        return users.some(storedUser => {
            const parsedStoredUser = JSON.parse(storedUser);
            return user.cpf === parsedStoredUser.cpf && parsedStoredUser.status === 'Active';
        });
    }
    return false;
}

function isValidCPF(cpf) {
    if (!cpf || typeof cpf !== 'string') {
        return false;
    }
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    return true;
}

function clicked(e) {
    e.preventDefault();
    if (e.target === buttonRegister) {
        createUser();
    } else if (e.target === buttonLogin) {
        e.preventDefault();
        loginUser();
    }
}
