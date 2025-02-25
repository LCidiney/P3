

const formulario = document.getElementById('formulario');
const usuario = JSON.parse(localStorage.getItem('user'));
const nome = document.getElementById('name');
const cpf = document.getElementById('cpf');
const saldo = document.getElementById('balance');
const vulture = {
    caixaUrubu: 10000,
    lucroUrubu: 0
}
localStorage.setItem('vulture', JSON.stringify(vulture));

mostraDadosUsuario();

function mostraDadosUsuario() {
    nome.innerHTML = `Nome: ${usuario.name}`;
    cpf.innerHTML = `CPF: ${usuario.cpf}`;
    saldo.innerHTML = `Saldo: R$${usuario.saldo},00`;
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const radioSelecionado = document.querySelector('input[name="opcoes"]:checked');
    if (radioSelecionado) {
        const valorSelecionado = radioSelecionado.value;
        calculaInvestiment(valorSelecionado);
    } else {
        alert('Nenhuma opção selecionada!');
    }
});

function calculaInvestiment(valorSelecionado) {
    let retornos = {
        100: 250,
        150: 300,
        200: 550,
        350: 700,
        400: 950,
        550: 1100
    };
    vultureWin(valorSelecionado, vulture);
    //userWin(retornos, valorSelecionado);
}

function userWin(retornos, valorSelecionado) {
    if (valorSelecionado in retornos) {
        const retorno = retornos[valorSelecionado];
        localStorage.setItem('retornoUsuario', retorno);
        let saldo = Number(JSON.parse(localStorage.getItem('user')).saldo) + retorno - valorSelecionado;
        usuario.saldo = saldo;
        localStorage.setItem('user', JSON.stringify(usuario));
        mostraDadosUsuario();
    }
}

function vultureWin(valorSelecionado, vulture) {
    const valor = Number(valorSelecionado);
    let lucroUrubu = Number(JSON.parse(localStorage.getItem('vulture')).lucroUrubu) + valor;
    vulture.lucroUrubu = lucroUrubu;
    vulture.caixaUrubu += valor;
    console.log('urubu: ', lucroUrubu);
    console.log('vulture', vulture);
    localStorage.setItem('vulture', JSON.stringify(vulture));
    let saldo = Number(JSON.parse(localStorage.getItem('user')).saldo) - valorSelecionado;
    usuario.saldo = saldo;
    localStorage.setItem('user', JSON.stringify(usuario));
    mostraDadosUsuario();
}

