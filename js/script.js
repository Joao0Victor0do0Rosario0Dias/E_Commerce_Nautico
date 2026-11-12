const search = document.getElementById('search');
const textarea = document.getElementById('textarea');
const btnregistrar = document.getElementById('btnregistrar');
const btnmostrarsenha = document.getElementById('mostrarsenha');
const botaoentrar = document.getElementById('botaoentrar');
const formulario = document.getElementById('registrar');
const campoconfirmacaosenha = document.getElementById('confirmacaosenha');
const camposenha = document.getElementById('senha');

let estadoborda = false;
let estadosenha = false;
let logado = false;

document.addEventListener('DOMContentLoaded', () => {
    carregarbotao();
    carregarMinhaConta();

    const btnlogar = document.getElementById('btnlogar');
    btnlogar?.addEventListener('click', logar);
    
    btnregistrar?.addEventListener('click', registrar);
});

btnmostrarsenha?.addEventListener('change', mostrarsenha);
textarea?.addEventListener('focus', borda);

function carregarbotao(){
    const emailatual = localStorage.getItem('emailatual');
    console.log(`emailatual: ${emailatual}`);
    if (emailatual) {
        let botaoentrar = document.getElementById('botaoentrar');
        let minhaconta = document.getElementById('minhaconta');
        if (botaoentrar){
            botaoentrar.style.display = "none";
            minhaconta.style.display = "flex";
        }
    }
}

function borda(){
    if(estadoborda){
        search.style.border="none";
        search.style.outline="none";
    } else{
        search.style.border="2px solid gray";
        search.style.outline="2px solid white";
    }
    estadoborda = !estadoborda;
}

function mostrarsenha(){
    if(estadosenha){
        camposenha.type = "password";
        campoconfirmacaosenha.type = "password";
    } else{
        camposenha.type = "text";
        campoconfirmacaosenha.type = "text";
    }
    estadosenha = !estadosenha;
}

function registrar(event) {
    if (event) event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const senha = document.getElementById('senha')?.value;
    const confirmacao = document.getElementById('confirmacaosenha')?.value;

    if (!email || !senha || !confirmacao) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve conter no mínimo 6 caracteres!");
        return;
    }

    if (senha !== confirmacao) {
        alert("As senhas não coincidem!");
        return;
    }

    localStorage.setItem('emailregistrado', email);
    localStorage.setItem('senhaatual', senha);
    localStorage.setItem('emailatual', email);

    console.log("Registrado e logado com sucesso");
    window.location.href = "index.html";
}

function logar(event) {
    if (event) event.preventDefault();

    const emailDigitado = document.getElementById('email')?.value.trim();
    const senhaDigitada = document.getElementById('senha')?.value;

    if (!emailDigitado || !senhaDigitada) {
        alert("Preencha o e-mail e a senha para entrar!");
        return;
    }

    const emailSalvo = localStorage.getItem('emailregistrado') || localStorage.getItem('emailatual');
    const senhaSalva = localStorage.getItem('senhaatual');

    if (emailDigitado === emailSalvo && senhaDigitada === senhaSalva) {
        localStorage.setItem('emailatual', emailDigitado);
        console.log("Logado com sucesso");
        window.location.href = "index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

function sairDaConta() {
    localStorage.removeItem('emailatual');
    window.location.href = "index.html";
}
function carregarMinhaConta() {
    const emailEl = document.getElementById('emailusuario');
    console.log(emailEl)
    if (!emailEl) return;

    const emailAtual = localStorage.getItem('emailatual');
    if (emailAtual) {
        emailEl.textContent = emailAtual;
    } else {
        window.location.href = "entrar.html";
    }
}

function alterarSenha() {
    const novaSenha = document.getElementById('novaSenha')?.value;
    const confirmarNovaSenha = document.getElementById('confirmarNovaSenha')?.value;

    if (!novaSenha || !confirmarNovaSenha) {
        alert("Por favor, preencha a nova senha e a confirmação!");
        return;
    }

    if (novaSenha !== confirmarNovaSenha) {
        alert("As senhas digitadas não coincidem!");
        return;
    }

    localStorage.setItem('senhaatual', novaSenha);
    alert("Senha alterada com sucesso!");

    document.getElementById('novaSenha').value = "";
    document.getElementById('confirmarNovaSenha').value = "";
}

let fotosNovas = [];

function processarFotos(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    fotosNovas = [];
    let carregadas = 0;

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fotosNovas.push(e.target.result);
            carregadas++;

            if (carregadas === files.length) {
                atualizarPreviaFotos();
            }
        };
        reader.readAsDataURL(files[i]);
    }
}

function atualizarPreviaFotos() {
    const imgPreview = document.getElementById("imgPreview");
    if (imgPreview && fotosNovas.length > 0) {
        imgPreview.src = fotosNovas[0];
    }

    const listaAntiga = document.getElementById("listaPreview");
    if (listaAntiga && fotosNovas.length > 0) {
        const novaLista = document.createElement("lista-de-fotos");
        novaLista.id = "listaPreview";
        novaLista.setAttribute("fotos", JSON.stringify(fotosNovas));
        listaAntiga.replaceWith(novaLista);
    }
}

function adicionarAnuncio(event) {
    const nome = document.getElementById("nomeNovo").value;
    const tipo = document.getElementById("tipoNovo").value;
    const preco = document.getElementById("precoNovo").value;
    const descricao = document.getElementById("descricaoNovo").value;

    if (!nome || !preco || !descricao) {
        alert("Por favor, preencha o Nome, Preço e Descrição!");
        return;
    }

    let id = Date.now().toString();
    const arrayFotosSalvar = fotosNovas.length > 0 ? fotosNovas : ["img/placeholder.png"];

    const novoProduto = {
        nome: nome,
        tipo: tipo,
        classificacao: "0", 
        compras: "0",
        preco: preco,
        descricao: descricao,
        fotosevideos: arrayFotosSalvar,
        capa: arrayFotosSalvar[0],
        id: id 
    };

    anuncios.push(novoProduto);
    localStorage.setItem('listaAnuncios', JSON.stringify(anuncios));
    GuardarOuRemoverArray(id, event, "produtosVendidos", false);
    
    alert("Anúncio adicionado com sucesso!");
    window.location.href = "index.html";
}
