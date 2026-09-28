import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from '../styles';
import { getPokemon, getPokemonSpecies, traduzirNome } from '../services/pokeapi';

export default function DetalhesScreen({ route }) {
  const { pokemon } = route.params;
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    (async () => {
      const [p, s] = await Promise.all([
        getPokemon(pokemon.id),
        getPokemonSpecies(pokemon.id).catch(() => null),
      ]);

      setDetalhes({ ...p, nomePt: traduzirNome(s, p.name) });
    })();
  }, [pokemon.id]);

  if (!detalhes) {
    return (
      <View style={[styles.screen, styles.container]}>
        <ActivityIndicator size="large" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Carregando detalhes...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image source={{ uri: detalhes.sprites.front_default }} style={styles.image} />
      <Text style={styles.title}>{detalhes.nomePt.toUpperCase()}</Text>
      <Text style={[styles.nomeEn, { marginBottom: 16 }]}>{detalhes.name}</Text>

      <Text style={styles.info}>Altura: {detalhes.height / 10} m</Text>
      <Text style={styles.info}>Peso: {detalhes.weight / 10} kg</Text>
      <Text style={styles.info}>
        Tipos: {detalhes.types.map((t) => t.type.name).join(', ')}
      </Text>
      <Text style={styles.info}>
        Habilidades: {detalhes.abilities.map((a) => a.ability.name).join(', ')}
      </Text>

      <Text style={[styles.info, { fontWeight: 'bold', marginTop: 12 }]}>
        Status base:
      </Text>

      {detalhes.stats.map((s) => (
        <Text key={s.stat.name} style={styles.info}>
          {s.stat.name}: {s.base_stat}
        </Text>
      ))}
    </ScrollView>
  );
}