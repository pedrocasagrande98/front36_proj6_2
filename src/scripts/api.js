const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes';

export async function fetchRestaurantes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro ao carregar dados da API');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
