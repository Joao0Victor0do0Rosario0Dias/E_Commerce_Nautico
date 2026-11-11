//Planejado de 10 a 50 anuncios
document.addEventListener('DOMContentLoaded', () => {
    carregar_curtidas();
    carregarProduto();
    carregarPagamento(); 
});

let anunciosOriginais = [
    {
        nome:"Produto a",
        tipo:"Barco",
        classificacao:"3",
        compras:"145",
        preco:"200000",
        descricao:"rfebwuifhqyuiewhqiujhewjkfghnewiocvbneqikwjughnbujiklhbfqhjl3ebkjree",
        fotosevideos:["img/placeholder.png","img/placeholder.png"],
        capa: "img/placeholder.png",
        id:"1",
    },
    {
        nome:"Produto b",
        tipo:"Barco",
        classificacao:"7",
        compras:"145",
        preco:"100000",
        descricao:"rfebwuifhqyuiewhqiujhewjkfghnewiocvbneqikwjughnbujiklhbfqhjl3ebkjree",
        fotosevideos:["img/placeholder.png","img/placeholder.png"],
        capa: "img/placeholder.png",
        id:"2",

    },
    {
        nome:"Barco C",
        tipo:"Barco",
        classificacao:"5",
        compras:"145",
        preco:"50000",
        descricao:"rfebwuifhqyuiewhqiujhewjkfghnewiocvbneqikwjughnbujiklhbfqhjl3ebkjree",
        fotosevideos:["img/placeholder.png","img/placeholder.png"],
        capa: "img/placeholder.png",
        id:"3",
    },
    {
        nome:"Produto d",
        tipo:"Peça",
        classificacao:"8",
        compras:"145",
        preco:"200000",
        descricao:"rfebwuifhqyuiewhqiujhewjkfghnewiocvbneqikwjughnbujiklhbfqhjl3ebkjree",
        fotosevideos:["img/placeholder.png","img/placeholder.png"],
        capa: "img/placeholder.png",
        id:"4",
    },
    {
        nome:"Produto e",
        tipo:"Acessorio",
        classificacao:"8",
        compras:"145",
        preco:"200000",
        descricao:"rfebwuifhqyuiewhqiujhewjkfghnewiocvbneqikwjughnbujiklhbfqhjl3ebkjree",
        fotosevideos:["img/placeholder.png","img/placeholder.png"],
        capa: "img/placeholder.png",
        id:"5",
    },
]
let anuncios = JSON.parse(localStorage.getItem('listaAnuncios')) || anunciosOriginais;
function curtir(id, event) {
  if (event) event.preventDefault(); 

  let curtidos = JSON.parse(localStorage.getItem('curtidos')) || [];
  let index = curtidos.indexOf(id);
  let idbtnfav = document.getElementById(`btnfav${id}`);

  if (index !== -1) {
    curtidos.splice(index, 1);
    if (idbtnfav) idbtnfav.style.color = "grey";
  } else {
    curtidos.push(id);
    if (idbtnfav) idbtnfav.style.color = "red";
  }

  localStorage.setItem('curtidos', JSON.stringify(curtidos));
}

function carregar_curtidas() {
  let curtidos = JSON.parse(localStorage.getItem('curtidos')) || [];
  for (const item of curtidos) {
    let idbtnfav = document.getElementById(`btnfav${item}`);
    if (idbtnfav) {
      idbtnfav.style.color = "red";
    }
  }
}
function obterArray(tipo) {
    const curtidos = JSON.parse(localStorage.getItem(tipo)) || [];
    return anuncios.filter(produto => curtidos.includes(String(produto.id)) || curtidos.includes(Number(produto.id)));
}
function GuardarOuRemoverArray(id, event, tipo, podeRemover=true) {
  if (event) event.preventDefault(); 

  let array = JSON.parse(localStorage.getItem(tipo)) || [];
  let index = array.indexOf(id);

  if (index !== -1 && podeRemover) {
    array.splice(index, 1);
  } else {
    array.push(id);
  }
  localStorage.setItem(tipo, JSON.stringify(array));
}
function selecionarProduto(id){
  localStorage.setItem("produtoSelect",id);
  console.log("Produto selecionado");
}
function carregarProduto() {
    const idSelecionado = localStorage.getItem("produtoSelect");
    if (!idSelecionado) return;

    const produto = anuncios.find(p => String(p.id) === String(idSelecionado));
    if (!produto) return;

    const nomeEl = document.getElementById("nomeproduto");
    if (nomeEl) nomeEl.textContent = produto.nome;

    const descEl = document.getElementById("descricaoproduto");
    if (descEl) descEl.textContent = produto.descricao;

    const precoEl = document.getElementById("precoproduto");
    if (precoEl) precoEl.textContent = `R$ ${produto.preco}`;

    const colPadrao = document.querySelector(".columnpadrao");
    if (colPadrao) {
        const imgPrincipal = colPadrao.querySelector("img");
        if (imgPrincipal) imgPrincipal.src = produto.capa;

        const listaFotosAntiga = colPadrao.querySelector("lista-de-fotos");
        if (listaFotosAntiga) {
            const novaLista = document.createElement("lista-de-fotos");
            novaLista.setAttribute("fotos", JSON.stringify(produto.fotosevideos));
            listaFotosAntiga.replaceWith(novaLista);
        }
    }

    const aside = document.querySelector("aside");
    if (aside) {
        const avaliacaoAntiga = aside.querySelector("avaliacao-por-estrelas");
        if (avaliacaoAntiga) {
            const novaAvaliacao = document.createElement("avaliacao-por-estrelas");
            novaAvaliacao.setAttribute("nota", produto.classificacao);
            novaAvaliacao.classList.add("estrelas");
            avaliacaoAntiga.replaceWith(novaAvaliacao);
        }
    }
}
function adicionarAnuncio() {
    const nome = document.getElementById("nomeNovo").value;
    const tipo = document.getElementById("tipoNovo").value;
    const preco = document.getElementById("precoNovo").value;
    const descricao = document.getElementById("descricaoNovo").value;

    if (!nome || !preco || !descricao) {
        alert("Por favor, preencha o Nome, Preço e Descrição!");
        return;
    }

    const novoProduto = {
        nome: nome,
        tipo: tipo,
        classificacao: "0", 
        compras: "0",
        preco: preco,
        descricao: descricao,
        fotosevideos: ["img/placeholder.png", "img/placeholder.png"],
        capa: "img/placeholder.png",
        id: Date.now().toString() 
    };

    anuncios.push(novoProduto);
    localStorage.setItem('listaAnuncios', JSON.stringify(anuncios));

    alert("Anúncio adicionado com sucesso!");
    window.location.href = "index.html";
    document.getElementById("nomeNovo").value = "";
    document.getElementById("precoNovo").value = "";
    document.getElementById("cepNovo").value = "";
    document.getElementById("qtdNovo").value = "";
    document.getElementById("descricaoNovo").value = "";
}
function carregarPagamento() {
    const idSelecionado = localStorage.getItem("produtoSelect");
    if (!idSelecionado) return;

    const produto = anuncios.find(p => String(p.id) === String(idSelecionado));
    if (!produto) return;

    const imgEl = document.getElementById("imgpagamento");
    if (imgEl) imgEl.src = produto.capa;

    const nomeEl = document.getElementById("nomepagamento");
    if (nomeEl) nomeEl.textContent = produto.nome;

    const precoEl = document.getElementById("precopagamento");
    if (precoEl) precoEl.textContent = `R$ ${produto.preco}`;
}

class ProdutoVertical extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const titulo = this.getAttribute('titulo') || 'Título Padrão';
      const preco = this.getAttribute('preco') || 'R$:??';
      const img = this.getAttribute('img') || 'img/placeholder.png';
      const nota = this.getAttribute('nota') || '0';
      const id = this.getAttribute('id');
      let notaInt = parseInt(nota);
  
      this.innerHTML = `
        <a href="produto.html" style="width: 200px; height: 275px; border: 1px solid black; border-radius: 15px; text-align: center; margin: auto; display: flex; justify-content: start; padding: 10px; flex-direction:column; color: black">
              <img src=${img} alt="placeholder" style=" width: 180px; height: 125px; padding: 5px; object-fit: fill;">
          
              <div style="flex-direction: column; padding-left: 10px;">
                  <p style="font-size: large;">${titulo}</p>
                  <p style="font-size: larger;">${preco}</p>
                  <div class="rowpadrao">              
                    <avaliacao-por-estrelas nota=${notaInt}></avaliacao-por-estrelas>
                    <i class="ri-heart-line" id="btnfav${id}" onclick="curtir('${id}', event)" style="color: grey; font-size: 25px;"></i>
                  </div>
              </div>
          </a>
      `;
    }
}
class ProdutoHorizontal extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const titulo = this.getAttribute('titulo') || 'Título Padrão';
      const preco = this.getAttribute('preco') || 'R$:??';
      const img = this.getAttribute('img') || 'img/placeholder.png';
      const nota = this.getAttribute('nota') || '0';
      const id = this.getAttribute('id');

      let notaInt = parseInt(nota);
  
      this.innerHTML = `
        <a href="produto.html" style="width: 90%; height: 130px; border: 1px solid  black; border-radius: 15px; text-align: center; margin: auto; display: flex; flex-direction: row; justify-content: start; padding: 10px; color: black">     
              <div style="position: relative;">
                  <img src=${img} alt="placeholder" style=" width: 180px; height: 125px; padding: 5px; object-fit: fill;">
                  <i class="ri-heart-line" id="btnfav${id}" onclick="curtir('${id}', event)" style="position: absolute;top: 1; right: 0; color: grey; font-size: 25px;"></i>
              </div>
              <div style="flex-direction: column; padding-left: 10px;">
                  <p style="font-size: large;">${titulo}</p>
                  <p style="font-size: larger;">${preco}</p>
                  <avaliacao-por-estrelas nota=${notaInt}></avaliacao-por-estrelas>
              </div>
              
          </a>
      `;
    }
}
class AvaliacaoPorEstrelas extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const nota = this.getAttribute('nota') || '0';
  
      let starhalf=false;
      let notaInt = parseInt(nota);
      let inner = '<div style="display: flex; flex-direction: row;">';
      for (let i=1; i<=10; i++){
        if (i==notaInt && i%2!=0){
            inner+= '<i class="ri-star-half-line"  style="color: goldenrod"></i>'; 
            starhalf=true;
        } else if (i<=notaInt && i%2==0){
            inner+= '<i class="ri-star-fill"  style="color: goldenrod"></i>'; 
        } else if (i%2==0){
            if(!starhalf){
              inner+= '<i class="ri-star-line"></i>'; 
            }
            starhalf=false;
        }
      }
      this.innerHTML = inner+ '</div>';
    }
}
class ListadeFotos extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      console.log("listafotos");
      let fotos = this.getAttribute('fotos') || `["img/placeholder.png"]`;
      let arrayfotos = JSON.parse(fotos);
      console.log(arrayfotos);
      let inner = '<div style="display: flex; flex-direction: row;">';
      for (let i=0; i<arrayfotos.length; i++){
        inner+= `<img src=${arrayfotos[i]} alt="" style="width: 80px; height: 80px; object-fit: cover; margin: 5px;">`;
      }
      this.innerHTML = inner+ '</div>';
    }
}
class ListadeProdutos extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      let tipo = this.getAttribute('tipo');
      let estilo = this.getAttribute('estilo') || 'vertical';
      let inner =`<div class="${(estilo == "horizontal")? "productscolumn" : "rowprodutos"}">`;
      if (tipo == "favoritos") {
          let favoritos = obterArray('curtidos');
          for (let item of favoritos) {
              inner += `<produto-${estilo} 
                  titulo="${item['nome']}" 
                  preco="${item['preco']}" 
                  img="${item['capa']}" 
                  nota="${item['classificacao']}"
                  id="${item['id']}"
                  onclick="selecionarProduto('${item['id']}')"
                  ></produto-${estilo}>`;
          }
      } else{
        for (let item of anuncios){
          console.log(item);
          if (tipo==item['tipo'] ||item['tipo']=="tudo") {
            console.log("true")
            inner += `<produto-${estilo} 
              titulo="${item['nome']}" 
              preco="${item['preco']}" 
              img="${item['capa']}" 
              nota="${item['classificacao']} "
              id="${item['id']}"
              onclick="selecionarProduto('${item['id']}')"
              ></produto-${estilo}>`;
          }
        }
      }
      
      this.innerHTML = inner+ '</div>';
    }
}
customElements.define('produto-vertical', ProdutoVertical);
customElements.define('produto-horizontal', ProdutoHorizontal);
customElements.define('avaliacao-por-estrelas', AvaliacaoPorEstrelas);
customElements.define('lista-de-fotos', ListadeFotos);
customElements.define('lista-de-produtos', ListadeProdutos);
document.addEventListener('DOMContentLoaded', carregar_curtidas);
const btnPagamento = document.getElementById('pagamento');
btnPagamento?.addEventListener('click', (event) => {
    const id = localStorage.getItem("produtoSelect");
    if (id) {
        GuardarOuRemoverArray(id, event, 'produtosComprados', false);
    }
    window.location.href = "index.html";
});

const radioCartao = document.getElementById('radioCartao');
const radioPix = document.getElementById('radioPix');
const caixaPagamento = document.getElementById('caixapagamento');

const htmlCartao = caixaPagamento ? caixaPagamento.innerHTML : '';
const htmlPix = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
        <h3>Escaneie o QR Code para pagar</h3>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PixCodeExemplo" alt="QR Code Pix" style="width: 200px; height: 200px; margin-top: 20px;">
    </div>
`;

radioCartao?.addEventListener('change', () => {
    if (radioCartao.checked && caixaPagamento) {
        caixaPagamento.innerHTML = htmlCartao;
    }
});

radioPix?.addEventListener('change', () => {
    if (radioPix.checked && caixaPagamento) {
        caixaPagamento.innerHTML = htmlPix;
    }
});