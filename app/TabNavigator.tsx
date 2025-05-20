import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import CadastroMotoScreen from './screens/CadastroMotoScreen';
import BuscarMotoScreen from './screens/BuscarMotoScreen';
import MovimentacaoScreen from './screens/MovimentacaoScreen';
import ResumoScreen from './screens/ResumoScreen';

const Tab = createBottomTabNavigator();

const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  Home: 'home',
  Cadastro: 'add-circle-outline',
  Buscar: 'search-outline',
  Movimentação: 'swap-horizontal-outline',
  Resumo: 'list-outline',
};

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#0D0D0D' },
          tabBarActiveTintColor: '#00C853',
          tabBarInactiveTintColor: '#ccc',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconMap[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cadastro" component={CadastroMotoScreen} />
        <Tab.Screen name="Buscar" component={BuscarMotoScreen} />
        <Tab.Screen name="Movimentação" component={MovimentacaoScreen} />
        <Tab.Screen name="Resumo" component={ResumoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
