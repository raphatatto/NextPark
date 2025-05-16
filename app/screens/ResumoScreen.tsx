import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Moto {
  placa: string;
  modelo: string;
  vaga: string;
  status: string;
  dataCadastro: string;
}

export default function ResumoScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);

useEffect(() => {
  const carregarMotos = async () => {
    try {
      const todasChaves = await AsyncStorage.getAllKeys();
      const chavesDeMotos = todasChaves.filter((key) => key.startsWith('moto-'));

      const resultado = await AsyncStorage.multiGet(chavesDeMotos);
      const listaDeMotos = resultado
        .map(([key, value]) => (value ? JSON.parse(value) : null))
        .filter(Boolean);

      setMotos(listaDeMotos);
    } catch (error: any) {
      Alert.alert('Erro ao carregar as motos:', error.message || String(error));
    }
  };

  carregarMotos(); // chamada aqui
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo das Motos Cadastradas</Text>
      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>📍 Placa: {item.placa}</Text>
            <Text>🏍️ Modelo: {item.modelo}</Text>
            <Text>🅿️ Vaga: {item.vaga}</Text>
            <Text>📌 Status: {item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma moto cadastrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
