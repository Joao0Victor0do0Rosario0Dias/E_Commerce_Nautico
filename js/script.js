const search = document.getElementById('search');
const textarea = document.getElementById('textarea');
const btnregistrar = document.getElementById('btnregistrar');
const btnmostrarsenha = document.getElementById('mostrarsenha');
const botaoentrar = document.getElementById('botaoentrar');
const formulario = document.getElementById('registrar');
const campoconfirmacaosenha = document.getElementById('confirmacaosenha');
const camposenha = document.getElementById('senha');
document.addEventListener('DOMContentLoaded', carregarbotao);
btnregistrar?.addEventListener('click',registrar);
btnmostrarsenha?.addEventListener('change',mostrarsenha);

let estadoborda=false;
let estadosenha=false;
let logado=false;

textarea.addEventListener('focus', borda);

function carregarbotao(){
  const emailatual = localStorage.getItem('emailatual');
  console.log(`emailatual: ${emailatual}`);
  if (emailatual) {
    document.getElementById('botaoentrar').style.display = "none";
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
function registrar(){
  let formdata =  new  FormData(formulario);
  let email = formdata.get('email');
  let senha = formdata.get('senha');
  let confirmacaosenha = formdata.get('confirmacaosenha');
  if (confirmacaosenha==senha){
    localStorage.setItem('emailatual', email);
    localStorage.setItem('senhaatual', senha);
    console.log("registrado");
    window.location.href = "index.html";

  };
}

function logar(){
  let formdata =  new  FormData(formulario);

    let emaildigitado = formdata.get('email');
    let senhadigitado = formdata.get('senha');
    let emailregistrado = localStorage.getItem('emailatual');
    let  = localStorage.getItem('senhaatual');
    if (emaildigitado==emailregistrado && senhadigitado==senharegistrado){
        console.log('logado');
    } else{
        console.log('Senha incorreta');
    }
}