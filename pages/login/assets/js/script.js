const form = document.querySelector(".login");
let users;
let user;

class User {
    constructor(name, cpf) {
        this.name = name;
        this.cpf = cpf;
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    isValidCPF(cpf);
    createUser();

});

function createUser() {
    try {
        const name = document.querySelector("#name").value.trim();
        const cpf = document.querySelector("#cpf").value;
        
        if (!name || !cpf) {
            throw new Error("Por favor, preencha todos os campos");
        }
        
        if (!isValidCPF(cpf)) {
            throw new Error("CPF inválido");
        }
        
        user = JSON.stringify(new User(name, cpf));
        if (!accessValidator(user)) {
            usersControl(user);
        } else {
            alert("Usuário com este CPF já existe!");
        }
    } catch (error) {
        alert(error.message);
    }
}

function usersControl(user) {
    users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Usuário cadastrado com sucesso!");
    window.location.href = "../opcoes/index.html";
}

function accessValidator(user) {
    const parsedUsers = JSON.parse(user);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(storedUser => {
        const parsedStoredUser = JSON.parse(storedUser);
        return parsedStoredUser.cpf === parsedUsers.cpf;
    });
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