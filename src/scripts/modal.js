import { formatarPreco } from './utils.js';
import { adicionarAoCarrinho } from './carrinho.js';

const overlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalImg = modal.querySelector('.modal__img');
const modalNome = modal.querySelector('.modal__nome');
const modalDescricao = modal.querySelector('.modal__descricao');
const modalPorcao = modal.querySelector('.modal__porcao');
const modalPreco = modal.querySelector('.modal__preco');
const modalBtn = modal.querySelector('.modal__btn');
const btnClose = document.getElementById('modal-close');

let pratoAtual = null;

export function abrirModal(prato) {
  pratoAtual = prato;
  modalImg.src = prato.foto;
  modalImg.alt = prato.nome;
  modalNome.textContent = prato.nome;
  modalDescricao.textContent = prato.descricao;
  modalPorcao.textContent = `Serve: ${prato.porcao}`;
  modalPreco.textContent = formatarPreco(prato.preco);
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  btnClose.focus();
}

export function fecharModal() {
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

modalBtn.addEventListener('click', () => {
  if (pratoAtual) {
    adicionarAoCarrinho(pratoAtual);
    fecharModal();
  }
});

btnClose.addEventListener('click', fecharModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) fecharModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.style.display === 'flex') fecharModal();
});
