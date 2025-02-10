
const formulario = document.getElementById("formulario")
formulario.addEventListener("submit", enviar);

function getFromStorage(chave) {
    return localStorage.getItem(chave);
}

function setInStorage(chave, valor) {
    localStorage.setItem(chave, valor);
}

function enviar(e) {
    e.preventDefault();
    let formData = new FormData(formulario);
    console.log(formData.get("opcoes"));  
    }