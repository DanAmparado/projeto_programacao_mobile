import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import { styles } from '../styles';
import {
  getAllPokemon,
  getTypes,
  getPokemonByType,
  montarCardPorId,
} from '../services/pokeapi';

const CORES_TIPO = {
  fire: '#f97316',
  water: '#3b82f6',
  grass: '#22c55e',
  electric: '#eab308',
  ice: '#67e8f9',
  fighting: '#b91c1c',
  poison: '#a855f7',
  ground: '#d97706',
  flying: '#818cf8',
  psychic: '#ec4899',
  bug: '#84cc16',
  rock: '#a16207',
  ghost: '#6d28d9',
  dragon: '#4338ca',
  dark: '#1f2937',
  steel: '#64748b',
  fairy: '#f472b6',
  normal: '#9ca3af',
};

export default function CardsScreen({ navigation }) {
  const [cards, setCards] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [carregandoTipo, setCarregandoTipo] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [tipoPokemon, setTipoPokemon] = useState(null);

  // Carrega lista completa + tipos uma vez
  useEffect(() => {
    (async () => {
      try {
        const [lista, ts] = await Promise.all([getAllPokemon(), getTypes()]);
        setAllPokemon(lista);
        setTipos(ts);
      } catch {
        Alert.alert('Erro', 'Falha ao carregar dados da PokéAPI.');
      }
    })();
  }, []);

  // Carrega os Pokémons do tipo selecionado
  useEffect(() => {
    if (!tipoSelecionado) {
      setTipoPokemon(null);
      setCarregandoTipo(false);
      return;
    }

    let cancelado = false;

    (async () => {
      try {
        setCarregandoTipo(true);
        const lista = await getPokemonByType(tipoSelecionado);
        if (!cancelado) setTipoPokemon(lista);
      } catch {
        if (!cancelado) Alert.alert('Erro', 'Falha ao filtrar por tipo.');
      } finally {
        if (!cancelado) setCarregandoTipo(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [tipoSelecionado]);

  // Sugestões (filtro local = instantâneo)
  const sugestoes = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const base = tipoPokemon ?? allPokemon;

    if (termo.length === 0) {
      return tipoPokemon ? tipoPokemon.slice(0, 20) : [];
    }

    const comeca = [];
    const contem = [];

    for (const p of base) {
      if (p.name.startsWith(termo) || String(p.id) === termo) {
        comeca.push(p);
      } else if (p.name.includes(termo)) {
        contem.push(p);
      }
      if (comeca.length >= 20) break;
    }

    return [...comeca, ...contem].slice(0, 20);
  }, [busca, allPokemon, tipoPokemon]);

  // Cards iniciais
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const ids = new Set();
        while (ids.size < 6) {
          ids.add(Math.floor(Math.random() * 151) + 1);
        }
        const cardsIniciais = await Promise.all(
          [...ids].map(montarCardPorId)
        );
        setCards(cardsIniciais);
      } catch {
        // silencioso
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function adicionarPorId(id) {
    try {
      setLoading(true);
      const card = await montarCardPorId(id);

      setCards((antigos) => {
        if (antigos.some((c) => c.id === card.id)) {
          Alert.alert('Aviso', `${card.nomePt} já está na lista.`);
          return antigos;
        }
        return [card, ...antigos];
      });

      setBusca('');
      setTipoSelecionado(null);
      Keyboard.dismiss();
    } catch {
      Alert.alert('Erro', 'Falha ao consultar a API.');
    } finally {
      setLoading(false);
    }
  }

  async function buscarPorTermo() {
    const termo = busca.trim();

    if (!termo) {
      Alert.alert('Atenção', 'Digite o nome ou número do Pokémon.');
      return;
    }

    // Se a sugestão exata aparecer, usa ela
    const matchExato = sugestoes.find(
      (s) => s.name === termo.toLowerCase() || String(s.id) === termo
    );

    if (matchExato) {
      adicionarPorId(matchExato.id);
      return;
    }

    // Senão, tenta buscar direto
    adicionarPorId(termo);
  }

  async function buscarAleatorio() {
    const id = Math.floor(Math.random() * 151) + 1;
    adicionarPorId(id);
  }

  function excluir(id) {
    setCards((antigos) => antigos.filter((c) => c.id !== id));
  }

  function renderCard({ item }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <Text style={styles.nome}>{item.nomePt.toUpperCase()}</Text>
        <Text style={styles.nomeEn}>{item.nome}</Text>
        <Text style={styles.info}>HP: {item.hp}</Text>
        <Text style={styles.info}>Tipos: {item.tipos.join(', ')}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Detalhes', { pokemon: item })}
          >
            <Text style={styles.actionText}>VER MAIS DETALHES</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => excluir(item.id)}>
            <Text style={styles.deleteText}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Barra de busca fixa em cima */}
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nome ou número (ex: pikachu, 25)"
          value={busca}
          onChangeText={setBusca}
          autoCapitalize="none"
          onSubmitEditing={buscarPorTermo}
          returnKeyType="search"
        />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={[styles.button, { flex: 1 }]}
            onPress={buscarPorTermo}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'BUSCANDO...' : 'BUSCAR'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondary, { flex: 1 }]}
            onPress={buscarAleatorio}
            disabled={loading}
          >
            <Text style={styles.buttonText}>ALEATÓRIO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chips de tipo */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
          {tipoSelecionado && (
            <TouchableOpacity
              style={[styles.chip, { backgroundColor: '#111827' }]}
              onPress={() => setTipoSelecionado(null)}
            >
              <Text style={[styles.chipTexto, { color: '#fff' }]}>
                Limpar ✕
              </Text>
            </TouchableOpacity>
          )}

          {tipos.map((t) => {
            const ativo = tipoSelecionado === t;
            const cor = CORES_TIPO[t] ?? '#9ca3af';

            return (
              <TouchableOpacity
                key={t}
                style={[
                  styles.chip,
                  ativo && { backgroundColor: cor },
                  carregandoTipo && !ativo && { opacity: 0.5 },
                ]}
                onPress={() => setTipoSelecionado(ativo ? null : t)}
                disabled={carregandoTipo}
              >
                <Text style={[styles.chipTexto, ativo && { color: '#fff' }]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Sugestões */}
      {(carregandoTipo || sugestoes.length > 0) && (
        <View style={styles.sugestoesContainer}>
          {carregandoTipo ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" />
              <Text style={{ marginTop: 8, color: '#6b7280', fontSize: 13 }}>
                Carregando Pokémons de {tipoSelecionado}...
              </Text>
            </View>
          ) : (
            <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
              {sugestoes.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={styles.sugestaoItem}
                  onPress={() => adicionarPorId(s.id)}
                >
                  <Text style={styles.sugestaoTexto}>
                    #{String(s.id).padStart(3, '0')} — {s.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      {/* Lista de cards */}
      <FlatList
        data={cards}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCard}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Nenhum card. Faça uma busca acima.
            </Text>
          )
        }
      />
    </View>
  );
}