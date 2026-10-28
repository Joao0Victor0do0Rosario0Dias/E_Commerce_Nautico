const search = document.getElementById('search');
const textarea = document.getElementById('textarea');
let estadoborda=false;
textarea.addEventListener('focus', borda);
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

class ProdutoVertical extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const titulo = this.getAttribute('titulo') || 'Título Padrão';
    const preco = this.getAttribute('preco') || 'R$:??';
    const img = this.getAttribute('img') || 'img/placeholder.png';

    this.innerHTML = `
      <div style="width: 200px; height: 275px; border: 1px solid  black; border-radius: 15px; text-align: center;">
        <img src=${img} alt="placeholder" style=" width: 180px; height: 125px; margin: auto; padding: 5px; object-fit: fill;">
        <p>${titulo}</p>
        <p style="font-size: large;">${preco}</p>
      </div>
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

    this.innerHTML = `
      <div style="width: 90%; height: 130px; border: 1px solid  black; border-radius: 15px; text-align: center; margin: auto; display: flex; flex-direction: row; justify-content: space-between; padding: 10px;">
        <img src=${img} alt="placeholder" style=" width: 180px; height: 125px; padding: 5px; object-fit: fill;">
        <p style="font-size: large;">${titulo}</p>
        <p style="font-size: larger;">${preco}</p>
      </div>
    `;
  }
}

customElements.define('produto-vertical', ProdutoVertical);
customElements.define('produto-horizontal', ProdutoHorizontal);
