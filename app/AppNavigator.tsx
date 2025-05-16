import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BuscarMotoScreen from './screens/BuscarMotoScreen';
import CadastroMotoScreen from './screens/CadastroMotoScreen';
import HomeScreen from './screens/HomeScreen';
import MovimentacaoScreen from './screens/MovimentacaoScreen';
import ResumoScreen from './screens/ResumoScreen';

export type RootStackParamList = {
  Home: undefined;
  'Cadastrar Moto': undefined;
  'Buscar Moto': undefined;
  'Movimentação': undefined;
  Resumo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastrar Moto" component={CadastroMotoScreen} />
        <Stack.Screen name="Buscar Moto" component={BuscarMotoScreen} />
        <Stack.Screen name="Movimentação" component={MovimentacaoScreen} />
        <Stack.Screen name="Resumo" component={ResumoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
