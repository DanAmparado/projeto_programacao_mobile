import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { obterUsuario } from '../services/storage';
import { styles } from '../styles';
import { apenasNumeros } from '../utils/validacoes';

export default function LoginScreen({ navigation, route }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastrado, setCadastrado] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const dados = await obterUsuario();
      setCadastrado(dados);
    });

    return unsubscribe;
  }, [navigation]);


  async function entrar() {
    const usuarioLimpo = usuario.trim().toLowerCase();
    const usuarioNumeros = apenasNumeros(usuario);

    if (!usuarioLimpo || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha usuário e senha.');
      return;
    }

    const dados = cadastrado ?? (await obterUsuario());

    if (!dados) {
      Alert.alert('Erro', 'Nenhum usuário cadastrado. Cadastre-se primeiro.');
      return;
    }

    const usuarioValido =
      usuarioLimpo === dados.email || usuarioNumeros === dados.cpf;
    const senhaValida = senha === dados.senha;

    if (!usuarioValido || !senhaValida) {
      Alert.alert('Erro', 'Usuário ou senha inválidos.');
      return;
    }

    navigation.navigate('Cards');
  }

  return (
    <View style={[styles.screen, styles.container]}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário (e-mail ou CPF)"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={entrar}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>CADASTRAR USUÁRIO</Text>
      </TouchableOpacity>
    </View>
  );
}