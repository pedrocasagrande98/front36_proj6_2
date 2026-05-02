import { fetchRestaurantes } from './api.js';
import { renderRestaurantes, setLoading } from './render.js';
import './carrinho.js';


document.addEventListener('DOMContentLoaded', async () => {
  setLoading(true);
  const data = await fetchRestaurantes();
  renderRestaurantes(data);
});
