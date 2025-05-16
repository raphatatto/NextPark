import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../constants/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Gestão de Motos – Mottu</Text>

      <View style={styles.button}>
        <Button title="Cadastrar Moto" onPress={() => navigation.navigate('Cadastrar Moto')} />
      </View>
      <View style={styles.button}>
        <Button title="Buscar Moto" onPress={() => navigation.navigate('Buscar Moto')} />
      </View>
      <View style={styles.button}>
        <Button title="Movimentação" onPress={() => navigation.navigate('Movimentação')} />
      </View>
      <View style={styles.button}>
        <Button title="Resumo" onPress={() => navigation.navigate('Resumo')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    marginBottom: 10,
  },
});
