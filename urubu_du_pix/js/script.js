function attSection() {
    let content = document.querySelector('.content');
    let login = document.querySelector('.login');
    let telaOpcoes = document.querySelector('.tela-opcoes');
    let telaResultado = document.querySelector('#tela-resultado');
    let button = document.querySelector('.btn-transf');

    switch (true) {
        case (content.style.display === "flex"):
            content.style.display = "none";
            login.style.display = "flex";
            telaOpcoes.style.display = "none";
            telaResultado.style.display = "none";
            button.innerHTML = "<b>LOGAR</b>";
            break;
        case (login.style.display === "flex"):
            let nome = document.querySelector('#nome').value.trim();
            let cpf = document.querySelector('#cpf').value.trim();
            if (!nome || !cpf) {
                alert("Por favor, preencha todos os campos antes de continuar.");
                break;
            };
            if (!verificarUsuario(cpf)) {
                salvarUsuario(nome, cpf);
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
            break;
        case (telaOpcoes.style.display === "flex"):
            let selectOption = document.querySelector('input[name="opcoes"]:checked');
            if (!selectOption) {
                alert("Por favor, selecione uma opção antes de continuar.");
                break;
            }
            localStorage.setItem('invest', selectOption.value);
            calcInvest();
            geraParagrafos();
            telaOpcoes.style.display = "none";
            telaResultado.style.display = "block";
            button.innerHTML = "<b>INICIAR APLICAÇÃO</b>";
            break;
        default:
            content.style.display = "flex";
            login.style.display = "none";
            telaOpcoes.style.display = "none";
            telaResultado.style.display = "none";
            button.innerHTML = "<b>IR PARA TELA DE LOGIN</b>";
            JSON.parse(localStorage.getItem('cpf'));
            localStorage.removeItem('cpf');
            break;
    };
};

document.querySelector('.btn-transf').addEventListener('click', attSection);
document.querySelectorAll('input[name="opcoes"]').forEach(radio => {
    radio.addEventListener('click', handleButtonClick);
});

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
    let lucroUsuario = localStorage.getItem('lucroUsuario');
    telaResult.innerHTML = "";

    if (lucroUsuario > 0) {
        let msgs = [
            `PARABÉNS, VOCÊ GANHOU!!!`,
            `Nome: ${nome}`,
            `CPF: ${cpf}`,
            `Valor investido: R$${invest},00`,
            `Valor lucrado: R$${lucroUsuario}`
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
};

function calcInvest() {
    let invest = parseInt(localStorage.getItem('invest'));
    let lucroUsuario = 0;
    let retornoUsuario = parseInt(localStorage.getItem('retornoUsuario')) || 0;
    let lucroUrubu = parseInt(localStorage.getItem('lucroUrubu')) || 0;
    let caixaUrubu = parseInt(localStorage.getItem('caixaUrubu')) || 10000;
    const investmentReturns = {
        100: 150,
        150: 150,
        200: 350,
        350: 350,
        400: 550,
        550: 550,
    };

    if (investmentReturns.hasOwnProperty(invest) && lucroUrubu > invest) {
        lucroUsuario += investmentReturns[invest];
        retornoUsuario = invest + lucroUsuario;
        lucroUrubu -= investmentReturns[invest];
        caixaUrubu -= investmentReturns[invest];
    } else {
        caixaUrubu += invest;
        lucroUrubu += invest;
        lucroUsuario -= invest;
        retornoUsuario -= invest;
        let cpf = JSON.parse(localStorage.getItem('cpf'));
        let cpfsBloqueados = JSON.parse(localStorage.getItem('cpfsBloqueados')) || [];
        if (!cpfsBloqueados.includes(cpf)) {
            cpfsBloqueados.push(cpf);
            localStorage.setItem('cpfsBloqueados', JSON.stringify(cpfsBloqueados));
        };
    };
    localStorage.setItem('lucroUsuario', lucroUsuario);
    localStorage.setItem('retornoUsuario', 0);
    localStorage.setItem('lucroUrubu', lucroUrubu);
    localStorage.setItem('caixaUrubu', caixaUrubu);
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let cpf = localStorage.getItem('cpf');
    console.log(retornoUsuario);
    usuarios = usuarios.map(usuario => usuario.cpf === cpf ? { ...usuario, retornoUsuario } : usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

function salvarUsuario(nome, cpf) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, cpf, retornoUsuario: 0 });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

function verificarUsuario(cpf) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuario = usuarios.find(usuario => usuario.cpf === cpf);
    if (usuario) {
        localStorage.setItem('nome', usuario.nome);
        localStorage.setItem('cpf', usuario.cpf);
        localStorage.setItem('retornoUsuario', usuario.retornoUsuario);
        return true;
    };
    return false;
};

function verificarAcesso() {
    let cpf = JSON.parse(localStorage.getItem('cpf'));
    let cpfsBloqueados = JSON.parse(localStorage.getItem('cpfsBloqueados')) || [];

    if (cpfsBloqueados.includes(cpf)) {
        alert("Acesso bloqueado para este CPF.");
        return false;
    };
    return true;
};

