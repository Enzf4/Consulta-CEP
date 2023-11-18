const saida = document.getElementById("saida");
const btn = document.getElementById("btnPesquisar");
const cep = document.getElementById("cep");
const resultado = document.querySelector(".result")
function obterCEP () {
    return cep.value.replace('-', '');
}

function apresentarDadosCEP(obj){
    return(!obj.erro)?
        `${obj.logradouro}
        ${obj.complemento} <br>
        ${obj.bairro} <br>
        ${obj.localidade}/ 
        ${obj.uf}` : "CEP inexistente"
}

async function buscarDadosCEP() {
    try{
        let urlCEP = `https://viacep.com.br/ws/${obterCEP()}/json/`;
        const trazerCEP = fetch(urlCEP)
        const resposta = await trazerCEP 
        const dadosJSON = await resposta.json();

        console.log(dadosJSON);
        saida.innerHTML = apresentarDadosCEP(dadosJSON)

        

    } catch (e){
        saida.textContent = `Falha na busca`
    }

    resultado.style.display = "block"
}

btn.addEventListener('click', buscarDadosCEP)

cep.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarDadosCEP();
    }
});