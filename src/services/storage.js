import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@projeto:user';

export async function salvarUsuario(usuario) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export async function obterUsuario() {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}