const BASE = 'https://pokeapi.co/api/v2';

let _allPokemonCache = null;
let _typesCache = null;
const _speciesCache = new Map();
const _typePokemonCache = new Map();

// Lista completa (nome + id) — carregada uma vez só
export async function getAllPokemon() {
  if (_allPokemonCache) return _allPokemonCache;

  const res = await fetch(`${BASE}/pokemon?limit=100000&offset=0`);
  if (!res.ok) throw new Error('Falha ao carregar lista');

  const data = await res.json();
  _allPokemonCache = data.results.map((p) => {
    const id = Number(p.url.split('/').filter(Boolean).pop());
    return { id, name: p.name };
  });

  return _allPokemonCache;
}

// Lista de tipos (fire, water, grass, ...)
export async function getTypes() {
  if (_typesCache) return _typesCache;

  const res = await fetch(`${BASE}/type`);
  if (!res.ok) throw new Error('Falha ao carregar tipos');

  const data = await res.json();
  _typesCache = data.results
    .map((t) => t.name)
    .filter((n) => n !== 'unknown' && n !== 'shadow');

  return _typesCache;
}

// Busca um Pokémon por id ou nome
export async function getPokemon(idOuNome) {
  const termo = String(idOuNome).toLowerCase().trim();
  const res = await fetch(`${BASE}/pokemon/${termo}`);

  if (!res.ok) throw new Error('NAO_ENCONTRADO');
  return res.json();
}

// Espécie (usada pra tradução)
export async function getPokemonSpecies(id) {
  if (_speciesCache.has(id)) return _speciesCache.get(id);

  const res = await fetch(`${BASE}/pokemon-species/${id}`);
  if (!res.ok) return null;

  const data = await res.json();
  _speciesCache.set(id, data);
  return data;
}

// Tenta pt-BR, depois pt, depois cai no fallback (inglês)
export function traduzirNome(species, fallback) {
  if (!species?.names) return fallback;

  const ptBr = species.names.find((n) => n.language.name === 'pt-BR');
  if (ptBr) return ptBr.name;

  const pt = species.names.find((n) => n.language.name === 'pt');
  if (pt) return pt.name;

  return fallback;
}

// Todos os Pokémons de um tipo
export async function getPokemonByType(tipo) {
  if (_typePokemonCache.has(tipo)) return _typePokemonCache.get(tipo);

  const res = await fetch(`${BASE}/type/${tipo}`);
  if (!res.ok) throw new Error('Falha ao buscar por tipo');

  const data = await res.json();
  const lista = data.pokemon.map((p) => {
    const id = Number(p.pokemon.url.split('/').filter(Boolean).pop());
    return { id, name: p.pokemon.name };
  });

  _typePokemonCache.set(tipo, lista);
  return lista;
}

// Monta o card a partir de um id, já com nome traduzido
export async function montarCardPorId(id) {
  const [p, species] = await Promise.all([
    getPokemon(id),
    getPokemonSpecies(id).catch(() => null),
  ]);

  return {
    id: p.id,
    nome: p.name,
    nomePt: traduzirNome(species, p.name),
    imagem: p.sprites.front_default,
    tipos: p.types.map((t) => t.type.name),
    hp: p.stats.find((s) => s.stat.name === 'hp')?.base_stat ?? 0,
  };
}