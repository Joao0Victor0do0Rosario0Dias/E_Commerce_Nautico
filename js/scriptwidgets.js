
class ProdutoVertical extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const titulo = this.getAttribute('titulo') || 'Título Padrão';
      const preco = this.getAttribute('preco') || 'R$:??';
      const img = this.getAttribute('img') || 'img/placeholder.png';
      const nota = this.getAttribute('nota') || '0';
      let notaInt = parseInt(nota);
  
      this.innerHTML = `
        <a href="produto.html" style="width: 200px; height: 275px; border: 1px solid black; border-radius: 15px; text-align: center; margin: auto; display: flex; justify-content: start; padding: 10px; flex-direction:column; color: black">
              <img src=${img} alt="placeholder" style=" width: 180px; height: 125px; padding: 5px; object-fit: fill;">
          
              <div style="flex-direction: column; padding-left: 10px;">
                  <p style="font-size: large;">${titulo}</p>
                  <p style="font-size: larger;">${preco}</p>
                  <div class="rowpadrao">              
                  <avaliacao-por-estrelas nota=${notaInt}></avaliacao-por-estrelas>
                  <i class="ri-heart-line" style="color: grey; font-size: 25px;"></i>
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
      let notaInt = parseInt(nota);
  
      this.innerHTML = `
        <a href="produto.html" style="width: 90%; height: 130px; border: 1px solid  black; border-radius: 15px; text-align: center; margin: auto; display: flex; flex-direction: row; justify-content: start; padding: 10px; color: black">     
              <div style="position: relative;">
                  <img src=${img} alt="placeholder" style=" width: 180px; height: 125px; padding: 5px; object-fit: fill;">
                  <i class="ri-heart-line" style="position: absolute;top: 1; right: 0; color: grey; font-size: 25px;"></i>
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
  customElements.define('produto-vertical', ProdutoVertical);
  customElements.define('produto-horizontal', ProdutoHorizontal);
  customElements.define('avaliacao-por-estrelas', AvaliacaoPorEstrelas);
  customElements.define('lista-de-fotos', ListadeFotos);
  
  
  







