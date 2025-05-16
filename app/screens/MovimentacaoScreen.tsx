import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovimentacaoScreen() {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState<'entrada' | 'saida' | ''>('');
  const [vaga, setVaga] = useState('');

  const registrarMovimentacao = async () => {
    if (!placa || !tipo || !vaga) {
      Alert.alert('Preencha todos os campos.');
      return;
    }

    const movimentacao = {
      placa,
      tipo,
      vaga,
      dataHora: new Date().toISOString(),
    };

    try {
      const historicoExistente = await AsyncStorage.getItem(`movimentacoes-${placa}`);
      const historico = historicoExistente ? JSON.parse(historicoExistente) : [];

      historico.push(movimentacao);

      await AsyncStorage.setItem(`movimentacoes-${placa}`, JSON.stringify(historico));

      Alert.alert('Movimentação registrada com sucesso!');
      setPlaca('');
      setTipo('');
      setVaga('');
    }  catch (error: any) {
        Alert.alert('Erro ao carregar as Movimentaçãoes:', error.message || String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Tipo de movimentação (entrada/saida):</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={(text) => setTipo(text.toLowerCase() as 'entrada' | 'saida')} />

      <Text style={styles.label}>Vaga:</Text>
      <TextInput style={styles.input} value={vaga} onChangeText={setVaga} />

      <Button title="Registrar Movimentação" onPress={registrarMovimentacao} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
});
