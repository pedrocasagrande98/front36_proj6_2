import { abrirModal } from './modal.js';
import { formatarPreco } from './utils.js';

const gridRestaurantes = document.querySelector('.restaurantes .container');
const secaoRestaurantes = document.getElementById('restaurantes');
const secaoDetalhes = document.getElementById('restaurante-detalhes');
const detalhesHeader = secaoDetalhes.querySelector('.detalhes-header');
const detalhesSubtipo = secaoDetalhes.querySelector('.detalhes__subtipo');
const detalhesTitulo = secaoDetalhes.querySelector('.detalhes__titulo');
const cardapioGrid = secaoDetalhes.querySelector('.cardapio-grid');
const btnVoltar = secaoDetalhes.querySelector('.detalhes__voltar');
const mainHeader = document.getElementById('main-header');
const mainHero = document.getElementById('main-hero');

const templateRestaurante = document.getElementById('restaurante-card');
const templatePrato = document.getElementById('prato-card');

export function renderRestaurantes(restaurantes) {
  gridRestaurantes.innerHTML = '';

  if (!restaurantes || restaurantes.length === 0) {
    gridRestaurantes.innerHTML = '<p class="mensagem-erro">Nenhum restaurante disponível no momento.</p>';
    return;
  }

  restaurantes.forEach((rest) => {
    const clone = templateRestaurante.content.cloneNode(true);

    clone.querySelector('.restaurante-card__img').src = rest.capa;
    clone.querySelector('.restaurante-card__img').alt = rest.titulo;
    clone.querySelector('.restaurante-card__nome').textContent = rest.titulo;
    clone.querySelector('.restaurante-card__nota').textContent = rest.avaliacao;
    clone.querySelector('.restaurante-card__descricao').textContent = rest.descricao;
    clone.querySelector('.badge--tipo').textContent = rest.tipo;

    if (rest.destacado) {
      clone.querySelector('.badge--destaque').classList.add('visible');
    }

    clone.querySelector('.restaurante-card__btn').addEventListener('click', () => {
      mostrarDetalhes(rest);
    });

    gridRestaurantes.appendChild(clone);
  });
}

export function setLoading(bool) {
  if (bool) {
    gridRestaurantes.innerHTML = '<p class="mensagem-loading">Carregando restaurantes...</p>';
  }
}

function mostrarDetalhes(restaurante) {
  secaoRestaurantes.style.display = 'none';
  mainHeader.classList.add('header--compact');
  if (mainHero) mainHero.style.display = 'none';



  detalhesHeader.style.backgroundImage = `url('${restaurante.capa}')`;
  detalhesSubtipo.textContent = restaurante.tipo;
  detalhesTitulo.textContent = restaurante.titulo;

  cardapioGrid.innerHTML = '';

  restaurante.cardapio.forEach((prato) => {
    const clone = templatePrato.content.cloneNode(true);

    clone.querySelector('.prato-card__img').src = prato.foto;
    clone.querySelector('.prato-card__img').alt = prato.nome;
    clone.querySelector('.prato-card__nome').textContent = prato.nome;
    clone.querySelector('.prato-card__descricao').textContent = prato.descricao;
    clone.querySelector('.prato-card__porcao').textContent = `Serve: ${prato.porcao}`;

    const btn = clone.querySelector('.prato-card__btn');
    btn.textContent = `Adicionar ao carrinho`;
    btn.addEventListener('click', () => abrirModal(prato));

    cardapioGrid.appendChild(clone);
  });

  secaoDetalhes.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarParaLista() {
  secaoDetalhes.style.display = 'none';
  secaoRestaurantes.style.display = 'block';
  mainHeader.classList.remove('header--compact');
  if (mainHero) mainHero.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}



const linkHome = document.querySelector('.header__link--home');

btnVoltar.addEventListener('click', voltarParaLista);
linkHome.addEventListener('click', (e) => {
  e.preventDefault();
  voltarParaLista();
});

