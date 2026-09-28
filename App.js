import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import CardsScreen from './src/screens/CardsScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: 'Cadastrar Usuário' }}
        />
        <Stack.Screen
          name="Cards"
          component={CardsScreen}
          options={({ navigation }) => ({
            title: 'Cards Pokémon',
            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                }
                style={{ paddingHorizontal: 12, paddingVertical: 4 }}
              >
                <Text
                  style={{
                    color: '#dc2626',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}
                >
                  SAIR
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={{ title: 'Mais Detalhes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}