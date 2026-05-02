import { formatarPreco } from './utils.js';

const carrinho = [];
let toastTimeout = null;

const cartButton = document.getElementById('cart-button');
const overlay = document.getElementById('carrinho-overlay');
const listaUl = document.getElementById('carrinho-lista');
const vazioMsg = document.getElementById('carrinho-vazio');
const footer = document.getElementById('carrinho-footer');
const totalValor = document.getElementById('carrinho-total-valor');

export function adicionarAoCarrinho(prato) {
  carrinho.push({ ...prato, cartId: Date.now() + Math.random() });
  atualizarContador();
  renderCarrinho();
  mostrarToast(`${prato.nome} adicionado ao carrinho!`);
}

export function removerDoCarrinho(cartId) {
  const index = carrinho.findIndex(item => item.cartId === cartId);
  if (index !== -1) {
    carrinho.splice(index, 1);
    atualizarContador();
    renderCarrinho();
  }
}

function atualizarContador() {
  const contador = document.getElementById('cart-button');
  if (contador) {
    const total = carrinho.length;
    const svg = contador.querySelector('svg').outerHTML;
    contador.innerHTML = `${total} produto(s) no carrinho ${svg}`;
  }
}


function renderCarrinho() {
  listaUl.innerHTML = '';
  
  if (carrinho.length === 0) {
    vazioMsg.style.display = 'block';
    footer.style.display = 'none';
    return;
  }

  vazioMsg.style.display = 'none';
  footer.style.display = 'block';

  let total = 0;
  carrinho.forEach(item => {
    total += item.preco;
    const li = document.createElement('li');
    li.className = 'carrinho-item';
    li.innerHTML = `
      <img src="${item.foto}" alt="${item.nome}" class="carrinho-item__img">
      <div class="carrinho-item__body">
        <h4 class="carrinho-item__nome">${item.nome}</h4>
        <p class="carrinho-item__preco">${formatarPreco(item.preco)}</p>
      </div>
      <button class="carrinho-item__remover" aria-label="Remover">&times;</button>
    `;
    
    li.querySelector('.carrinho-item__remover').addEventListener('click', () => {
      removerDoCarrinho(item.cartId);
    });
    
    listaUl.appendChild(li);
  });

  totalValor.textContent = formatarPreco(total);
}

function abrirCarrinho() {
  renderCarrinho();
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

export function initCarrinho() {
  const btn = document.getElementById('cart-button');
  const ov = document.getElementById('carrinho-overlay');
  
  if (btn) {
    btn.addEventListener('click', abrirCarrinho);
  }
  
  if (ov) {
    ov.addEventListener('click', (e) => {
      if (e.target === ov) fecharCarrinho();
    });
  }
}

initCarrinho();


function mostrarToast(mensagem) {
  let toast = document.getElementById('carrinho-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'carrinho-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = mensagem;
  toast.classList.add('toast--visible');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 2500);
}
