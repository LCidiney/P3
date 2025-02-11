document.querySelector('.btn-transf').addEventListener('click', attSection);
document.querySelectorAll('input[name="opcoes"]').forEach(radio => {
    radio.addEventListener('click', handleButtonClick);
});

function attSection() {
    let content = document.querySelector('.content');
    let login = document.querySelector('.login');
    let telaOpcoes = document.querySelector('.tela-opcoes');
    let telaResultado = document.querySelector('#tela-resultado');
    let button = document.querySelector('.btn-transf');
    if (content.style.display === "flex") {
        content.style.display = "none";
        login.style.display = "flex";
        telaOpcoes.style.display = "none";
        telaResultado.style.display = "none";
        button.innerHTML = "<b>LOGAR</b>";
    } else if (login.style.display === "flex") {
        let nome = document.querySelector('#nome').value.trim();
        let cpf = document.querySelector('#cpf').value.trim();
        if (!nome || !cpf) {
            alert("Por favor, preencha todos os campos antes de continuar.");
            return;
        };
        localStorage.setItem('nome', nome);
        localStorage.setItem('cpf', cpf);
        if (!verificarAcesso()) {
            return;
        };
        login.style.display = "none";
        telaOpcoes.style.display = "flex";
        telaResultado.style.display = "none";
        button.innerHTML = "<b>INVESTIR</b>";
    } else if (telaOpcoes.style.display === "flex") {
        let selectOption = document.querySelector('input[name="opcoes"]:checked');
        if (!selectOption) {
            alert("Por favor, selecione uma opção antes de continuar.");
            return;
        };
        localStorage.setItem('invest', selectOption.value);
        calcInvest();
        geraParagrafos();
        telaOpcoes.style.display = "none";
        telaResultado.style.display = "block";
        button.innerHTML = "<b>INICIAR APLICAÇÃO</b>";
    } else {
        content.style.display = "flex";
        login.style.display = "none";
        telaOpcoes.style.display = "none";
        telaResultado.style.display = "none";
        button.innerHTML = "<b>INICIAR APLICAÇÃO</b>";
        JSON.parse(localStorage.getItem('cpf'));
        localStorage.removeItem('cpf');
    };
};

function handleButtonClick() {
    let telaOpcoes = document.querySelector('.tela-opcoes');
    if (telaOpcoes.style.display === "flex") {
        let selectOption = document.querySelector('input[name="opcoes"]:checked');
        if (!selectOption) {
            alert("Por favor, selecione uma opção antes de continuar.");
            return;
        }
    }

};

function geraParagrafos() {
    let telaResult = document.querySelector('#resultado-lucro');
    let invest = localStorage.getItem('invest');
    let nome = localStorage.getItem('nome');
    let cpf = localStorage.getItem('cpf');
    let retornoUsuario = localStorage.getItem('retornoUsuario');
    telaResult.innerHTML = "";

    if (retornoUsuario > 0) {
        let msgs = [
            `PARABÉNS, VOCÊ GANHOU!!!`,
            `Nome: ${nome}`,
            `CPF: ${cpf}`,
            `Valor investido: R$${invest},00`,
            `Valor retornado: R$${retornoUsuario}`
        ];
        msgs.forEach(msg => {
            let paragrafo = document.createElement('p');
            paragrafo.textContent = msg;
            telaResult.appendChild(paragrafo);
        });
    } else {
        let msgs = [
            `PERDEU OTÁRIO!!!`,
            `Nome: ${nome}`,
            `CPF: ${cpf}`,
            `Valor investido: R$${invest},00`,
            `Valor roubado: R$${invest},00`,
        ];
        msgs.forEach(msg => {
            let paragrafo = document.createElement('p');
            paragrafo.textContent = msg;
            telaResult.appendChild(paragrafo);
        });
        let imagem = document.createElement('img');
        imagem.src = "./assets/imgs/urubu_voando.jpg";
        imagem.alt = "urubu_voando";
        imagem.classList.add('urubu_voando');
        telaResult.appendChild(imagem);
    };
}

function calcInvest() {
    let invest = parseInt(localStorage.getItem('invest'));
    let retornoUsuario = 0;
    let lucroUrubu = parseInt(localStorage.getItem('lucroUrubu')) || 0;
    let caixaUrubu = parseInt(localStorage.getItem('caixaUrubu')) || 10000;
    if (invest === 100 && lucroUrubu > invest) {
        retornoUsuario = invest + 150;
        lucroUrubu = lucroUrubu - 150;
        caixaUrubu = caixaUrubu - 150;
    } else if (invest === 150 && lucroUrubu > invest) {
        retornoUsuario = invest + 150;
        lucroUrubu = lucroUrubu - 150;
        caixaUrubu = caixaUrubu - 150;
    } else if (invest === 200 && lucroUrubu > invest) {
        retornoUsuario = invest + 350;
        lucroUrubu = lucroUrubu - 350;
        caixaUrubu = caixaUrubu - 350;
    } else if (invest === 350 && lucroUrubu > invest) {
        retornoUsuario = invest + 350;
        lucroUrubu = lucroUrubu - 350;
        caixaUrubu = caixaUrubu - 350;
    } else if (invest === 400 && lucroUrubu > invest) {
        retornoUsuario = invest + 550;
        lucroUrubu = lucroUrubu - 550;
        caixaUrubu = caixaUrubu - 550;
    } else if (invest === 550 && lucroUrubu > invest) {
        retornoUsuario = invest + 550;
        lucroUrubu = lucroUrubu - 550;
        caixaUrubu = caixaUrubu - 550;
    } else {
        caixaUrubu = caixaUrubu + invest;
        lucroUrubu = lucroUrubu + invest;
        retornoUsuario = retornoUsuario - invest;
        let cpfsBloqueados = JSON.parse(localStorage.getItem('cpfsBloqueados')) || [];
        let cpf = JSON.parse(localStorage.getItem('cpf'));
        if (!cpfsBloqueados.includes(cpf)) {
            cpfsBloqueados.push(cpf);
            localStorage.setItem('cpfsBloqueados', JSON.stringify(cpfsBloqueados));
        }
        }
    localStorage.setItem('retornoUsuario', retornoUsuario);
    localStorage.setItem('lucroUrubu', lucroUrubu);
    localStorage.setItem('caixaUrubu', caixaUrubu);
};

function verificarAcesso() {
    let cpf = JSON.parse(localStorage.getItem('cpf'));
    let cpfsBloqueados = JSON.parse(localStorage.getItem('cpfsBloqueados')) || [];

    if (cpfsBloqueados.includes(cpf)) {
        alert("Acesso bloqueado para este CPF.");
        return false;
    }
    return true;
};

