/*function updateContent() {
    let contentSection = document.getElementById('content');
}
*/

const caixaInicialUrubu = 100000;
let lucroUrubu = 0;
let caixaTotalUrubu = caixaInicialUrubu + lucroUrubu;



let lucroInvest = 0;



if (lucroInvest <= lucroUrubu) {
    let invest = 100;
    let lucroInvest = invest * 1.5; 
    if (lucroInvest > lucroUrubu) {
        lucroUrubu = lucroUrubu + invest;
        return lucroUrubu;
    };
};

