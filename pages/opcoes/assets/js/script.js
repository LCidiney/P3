const formulario = document.getElementById('formulario');
const user = JSON.parse(localStorage.getItem('user'));
const nome = document.getElementById('name');
const cpf = document.getElementById('cpf');
const saldo = document.getElementById('balance');
let vulture;

if (localStorage.getItem('vulture') !== null) {
    vulture = JSON.parse(localStorage.getItem('vulture'));
} else {
    vulture = {
        caixaUrubu: 10000,
        lucroUrubu: 0
    }
    localStorage.setItem('vulture', JSON.stringify(vulture));
}

showUserData();

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const radioSelecionado = document.querySelector('input[name="opcoes"]:checked');
    if (radioSelecionado) {
        const valorSelecionado = radioSelecionado.value;
        calcInvestiment(valorSelecionado);
    } else {
        alert('Nenhuma opção selecionada!');
    }
});

function showUserData() {
    nome.innerHTML = `Nome: ${user.name}`;
    cpf.innerHTML = `CPF: ${user.cpf}`;
    saldo.innerHTML = `Saldo: R$${user.saldo},00`;
}

function calcInvestiment(valorSelecionado) {
    let retornos = {
        100: 250,
        150: 300,
        200: 550,
        350: 700,
        400: 950,
        550: 1100
    };
    if (Number(user.saldo) < valorSelecionado) {
        alert("Saldo insuficiente para realizar esta apostas!");
        return false;
    } else if (vulture.lucroUrubu < valorSelecionado) {
        alert("urubu venceu");
        vultureWin(valorSelecionado, vulture);
    } else if (vulture.lucroUrubu > valorSelecionado) {
        SortWinner(retornos, valorSelecionado);
    } else {
        alert("urubu venceu");
        vultureWin(valorSelecionado, vulture);
    }
}

function userWin(retornos, valorSelecionado) {
    if (valorSelecionado in retornos) {
        const valor = Number(valorSelecionado);
        const retorno = retornos[valorSelecionado];
        let saldo = Number(user.saldo) + retorno - valorSelecionado;
        user.saldo = saldo;
        user.attempts++;
        let lucroUrubu = Number(vulture.lucroUrubu) - (retorno - valor);
        vulture.caixaUrubu -= retorno - valor;
        vulture.lucroUrubu = lucroUrubu;
        localStorage.setItem('vulture', JSON.stringify(vulture));
        localStorage.setItem('user', JSON.stringify(user));
        showUserData();
        canContinue();
    }
}

function vultureWin(valorSelecionado, vulture) {
    const valor = Number(valorSelecionado);
    let lucroUrubu = Number(JSON.parse(localStorage.getItem('vulture')).lucroUrubu) + valor;
    vulture.lucroUrubu = lucroUrubu;
    vulture.caixaUrubu += valor;
    localStorage.setItem('vulture', JSON.stringify(vulture));
    let saldo = Number(JSON.parse(localStorage.getItem('user')).saldo) - valorSelecionado;
    user.saldo = saldo;
    user.attempts++;
    localStorage.setItem('user', JSON.stringify(user));
    showUserData();
    canContinue();
}

function SortWinner(retornos, valorSelecionado) {
    const random = Math.random();
    if (random <= 0.49) {
        alert("usuario venceu");
        userWin(retornos, valorSelecionado);
    } else {
        alert("urubu venceu");
        vultureWin(valorSelecionado, vulture);
    }
}

function canContinue() {
    const userBalance = Number(JSON.parse(localStorage.getItem('user')).saldo);
    let userAttempts = Number(JSON.parse(localStorage.getItem('user')).attempts);
    if (userBalance < 100 || userAttempts === 3) {
        accessBlock(userBalance);
        window.location.href = "../../index.html";
    }
    return;
}

function accessBlock(userBalance, userAttempts) {
    const user = JSON.parse(localStorage.getItem('user'));
    let users = JSON.parse(localStorage.getItem('users'));
    if (typeof users[0] === 'string') {
        users = users.map(u => JSON.parse(u));
    }
    user.saldo = userBalance;
    user.attempts = userAttempts;
    user.status = 'Blocked';
    const userIndex = users.findIndex(u => u.cpf === user.cpf);
    if (userIndex !== -1) {
        users[userIndex] = user;
    }
    if (typeof users[0] !== 'string') {
        users = users.map(u => JSON.stringify(u));
    }
    localStorage.removeItem('user');
    localStorage.setItem('users', JSON.stringify(users));
}