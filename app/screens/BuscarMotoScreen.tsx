import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Color';
import { Ionicons } from '@expo/vector-icons';

export default function BuscarMotoScreen() {
  const [placaBusca, setPlacaBusca] = useState('');
  const [moto, setMoto] = useState<any>(null);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);

  const buscarMoto = async () => {
    const placa = placaBusca.trim().toUpperCase();
    if (!placa) {
      Alert.alert('Digite a placa da moto.');
      return;
    }

    try {
      const dadosMoto = await AsyncStorage.getItem(`moto-${placa}`);
      const dadosMov = await AsyncStorage.getItem(`movimentacoes-${placa}`);

      if (!dadosMoto) {
        Alert.alert('Moto não encontrada.');
        setMoto(null);
        setMovimentacoes([]);
        return;
      }

      setMoto(JSON.parse(dadosMoto));
      setMovimentacoes(dadosMov ? JSON.parse(dadosMov).reverse() : []);
    } catch (error) {
      Alert.alert('Erro ao buscar a moto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Buscar Placa:</Text>
      <TextInput
        style={styles.input}
        value={placaBusca}
        onChangeText={setPlacaBusca}
        placeholder="Ex: ABC1234"
        placeholderTextColor="#aaa"
      />
      <Button title="Buscar" color={Colors.primary} onPress={buscarMoto} />

      {moto && (
        <View style={styles.card}>
        <Text style={styles.cardTitle}>
          <Ionicons name="search-outline" size={18} color="#B9F6CA" /> Informações da Moto
        </Text>
        <Text style={styles.info}>
          <Ionicons name="location-outline" size={16} color="#B9F6CA" /> Placa: {moto.placa}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="bicycle" size={16} color="#B9F6CA" /> Modelo: {moto.modelo}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="car-outline" size={16} color="#B9F6CA" /> Vaga Atual: {moto.vaga}
        </Text>
        <Text style={styles.info}>
          <Ionicons name="pin-outline" size={16} color="#B9F6CA" /> Status: {moto.status}
        </Text>
      </View>

      )}

      {movimentacoes.length > 0 && (
        <View>
          <Text style={styles.cardTitle}>📜 Histórico de Movimentações</Text>
          <FlatList
            data={movimentacoes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.movCard}>
                <Text style={styles.info}>📅 {new Date(item.dataHora).toLocaleString()}</Text>
                <Text style={styles.info}>🔁 Tipo: {item.tipo}</Text>
                <Text style={styles.info}>🅿️ Vaga: {item.vaga}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  label: { color: Colors.text, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  cardTitle: { color: Colors.secondary, fontWeight: 'bold', fontSize: 16, marginVertical: 10 },
  info: { color: Colors.text, marginBottom: 4 },
  movCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
});
