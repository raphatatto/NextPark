import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BuscarMotoScreen() {
  const [placaBusca, setPlacaBusca] = useState('');
  const [resultado, setResultado] = useState<null | any>(null);

  const buscarMoto = async () => {
    if (!placaBusca) {
      Alert.alert('Digite a placa da moto para buscar.');
      return;
    }

    try {
      const dados = await AsyncStorage.getItem(`moto-${placaBusca}`);
      if (dados) {
        setResultado(JSON.parse(dados));
      } else {
        Alert.alert('Moto não encontrada.');
        setResultado(null);
      }
    } catch (error: any) {
    Alert.alert('Erro ao buscar as motos:', error.message || String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite a Placa da Moto:</Text>
      <TextInput
        style={styles.input}
        value={placaBusca}
        onChangeText={setPlacaBusca}
        placeholder="Ex: ABC1234"
      />
      <Button title="Buscar" onPress={buscarMoto} />

      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoText}>📍 Placa: {resultado.placa}</Text>
          <Text style={styles.resultadoText}>🏍️ Modelo: {resultado.modelo}</Text>
          <Text style={styles.resultadoText}>🅿️ Vaga: {resultado.vaga}</Text>
          <Text style={styles.resultadoText}>📌 Status: {resultado.status}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  resultado: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  resultadoText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
