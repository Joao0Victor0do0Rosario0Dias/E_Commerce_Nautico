const search = document.getElementById('search');
const textarea = document.getElementById('textarea');
const btnregistrar = document.getElementById('btnregistrar');
const btnmostrarsenha = document.getElementById('mostrarsenha');
const botaoentrar = document.getElementById('botaoentrar');
const formulario = document.getElementById('registrar');
const campoconfirmacaosenha = document.getElementById('confirmacaosenha');
const camposenha = document.getElementById('senha');
document.addEventListener('DOMContentLoaded', () => {
    carregarbotao();
    carregarMinhaConta();
});
btnregistrar?.addEventListener('click',registrar);
btnmostrarsenha?.addEventListener('change',mostrarsenha);

let estadoborda=false;
let estadosenha=false;
let logado=false;

textarea?.addEventListener('focus', borda);

function carregarbotao(){
  const emailatual = localStorage.getItem('emailatual');
  console.log(`emailatual: ${emailatual}`);
  if (emailatual) {
    let botaoentrar = document.getElementById('botaoentrar');
    let minhaconta =document.getElementById('minhaconta');
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
   estadoborda=!estadoborda;
}
function mostrarsenha(){
  if(estadosenha){
    camposenha.type = "password";
    campoconfirmacaosenha.type = "password";

  } else{
    camposenha.type = "text";
    campoconfirmacaosenha.type = "text";

  }
  estadosenha=!estadosenha;
}
document.addEventListener('DOMContentLoaded', () => {
    carregarbotao();
    carregarMinhaConta();

    const btnregistrar = document.getElementById('btnregistrar');
    btnregistrar?.addEventListener('click', registrar);

    const btnlogar = document.getElementById('btnlogar');
    btnlogar?.addEventListener('click', logar);
});

function registrar(event) {
    if (event) event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const senha = document.getElementById('senha')?.value;
    const confirmacao = document.getElementById('confirmacaosenha')?.value;

    if (senha === confirmacao && email) {
        localStorage.setItem('emailregistrado', email);
        localStorage.setItem('senhaatual', senha);
        localStorage.setItem('emailatual', email);

        console.log("Registrado e logado com sucesso");
        window.location.href = "index.html";
    } else {
        alert("As senhas não coincidem ou campos estão vazios!");
    }
}

function logar(event) {
    if (event) event.preventDefault();

    const emailDigitado = document.getElementById('email')?.value.trim();
    const senhaDigitada = document.getElementById('senha')?.value;

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


let quantidadeSelecionada = 1;
let precoBaseProduto = 0;
let freteCalculado = 0;

