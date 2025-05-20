import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Color';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Moto {
  placa: string;
  modelo: string;
  vaga: string;
  status: string;
  dataCadastro: string;
}

export default function ResumoScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);

  const carregarMotos = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const motosKeys = keys.filter((k) => k.startsWith('moto-'));
    const dados = await AsyncStorage.multiGet(motosKeys);
    const lista = dados.map(([_, val]) => val ? JSON.parse(val) : null).filter(Boolean);
    setMotos(lista);
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo das Motos Cadastradas</Text>

      <FlatList
        data={motos}
        keyExtractor={(item) => item.placa}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              <Ionicons name="location-outline" size={16} color="#B9F6CA" style={styles.icon} />
              Placa: {item.placa}
            </Text>
            <Text style={styles.text}>
              <Ionicons name="bicycle" size={16} color="#B9F6CA" style={styles.icon} />
              Modelo: {item.modelo}
            </Text>
            <Text style={styles.text}>
              <Ionicons name="car-outline" size={16} color="#B9F6CA" style={styles.icon} />
              Vaga: {item.vaga}
            </Text>
            <Text style={styles.text}>
              <Ionicons name="pin-outline" size={16} color="#B9F6CA" style={styles.icon} />
              Status: {item.status}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.text}>Nenhuma moto cadastrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  text: {
    color: Colors.text,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
  },
});
