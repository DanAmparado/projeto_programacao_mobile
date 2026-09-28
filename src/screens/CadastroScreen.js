import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { salvarUsuario } from '../services/storage';
import { styles } from '../styles';
import {
  cpfValido,
  emailValido,
  formatarCpf,
  formatarTelefone,
  apenasNumeros,
} from '../utils/validacoes';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');

  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};

    if (!nome.trim()) {
      novosErros.nome = 'Informe o nome.';
    } else if (nome.trim().length < 3) {
      novosErros.nome = 'Nome muito curto.';
    }

    if (!telefone.trim()) {
      novosErros.telefone = 'Informe o telefone.';
    } else if (apenasNumeros(telefone).length < 10) {
      novosErros.telefone = 'Telefone incompleto.';
    }

    if (!cpf.trim()) {
      novosErros.cpf = 'Informe o CPF.';
    } else if (!cpfValido(cpf)) {
      novosErros.cpf = 'CPF inválido.';
    }

    if (!email.trim()) {
      novosErros.email = 'Informe o e-mail.';
    } else if (!emailValido(email)) {
      novosErros.email = 'E-mail inválido.';
    }

    if (!curso.trim()) {
      novosErros.curso = 'Informe o curso.';
    }

    if (!senha) {
      novosErros.senha = 'Informe uma senha.';
    } else if (senha.length < 4) {
      novosErros.senha = 'Senha deve ter pelo menos 4 caracteres.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function salvar() {
    if (!validar()) {
      Alert.alert('Atenção', 'Corrija os campos destacados.');
      return;
    }

    await salvarUsuario({
      nome: nome.trim(),
      telefone: apenasNumeros(telefone),
      cpf: apenasNumeros(cpf),
      email: email.trim().toLowerCase(),
      curso: curso.trim(),
      senha,
    });

    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    navigation.navigate('Login');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar Usuário</Text>

      <TextInput
        style={[styles.input, erros.nome && styles.inputErro]}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      {erros.nome && <Text style={styles.erroTexto}>{erros.nome}</Text>}

      <TextInput
        style={[styles.input, erros.telefone && styles.inputErro]}
        placeholder="Telefone"
        value={telefone}
        onChangeText={(v) => setTelefone(formatarTelefone(v))}
        keyboardType="phone-pad"
      />
      {erros.telefone && <Text style={styles.erroTexto}>{erros.telefone}</Text>}

      <TextInput
        style={[styles.input, erros.cpf && styles.inputErro]}
        placeholder="CPF"
        value={cpf}
        onChangeText={(v) => setCpf(formatarCpf(v))}
        keyboardType="numeric"
        maxLength={14}
      />
      {erros.cpf && <Text style={styles.erroTexto}>{erros.cpf}</Text>}

      <TextInput
        style={[styles.input, erros.email && styles.inputErro]}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {erros.email && <Text style={styles.erroTexto}>{erros.email}</Text>}

      <TextInput
        style={[styles.input, erros.curso && styles.inputErro]}
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
      />
      {erros.curso && <Text style={styles.erroTexto}>{erros.curso}</Text>}

      <TextInput
        style={[styles.input, erros.senha && styles.inputErro]}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erros.senha && <Text style={styles.erroTexto}>{erros.senha}</Text>}

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>SALVAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}