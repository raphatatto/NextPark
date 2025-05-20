import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Color';

export default function MovimentacaoScreen() {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('');
  const [vaga, setVaga] = useState('');

  const registrarMovimentacao = async () => {
    const placaUpper = placa.trim().toUpperCase();
    const vagaUpper = vaga.trim().toUpperCase();

    if (!placaUpper || !tipo || !vagaUpper) {
      Alert.alert('Preencha todos os campos.');
      return;
    }

    try {
      // Verifica se a moto está cadastrada
      const motoData = await AsyncStorage.getItem(`moto-${placaUpper}`);
      if (!motoData) {
        Alert.alert('Moto não encontrada. Cadastre primeiro.');
        return;
      }

      const movimentacao = {
        placa: placaUpper,
        tipo: tipo.toLowerCase(),
        vaga: vagaUpper,
        dataHora: new Date().toISOString(),
      };

      // Atualiza histórico de movimentações
      const historicoExistente = await AsyncStorage.getItem(`movimentacoes-${placaUpper}`);
      const historico = historicoExistente ? JSON.parse(historicoExistente) : [];
      historico.push(movimentacao);
      await AsyncStorage.setItem(`movimentacoes-${placaUpper}`, JSON.stringify(historico));

      // Atualiza a vaga atual da moto (se for entrada ou mudança de vaga)
      const motoAtual = JSON.parse(motoData);
      motoAtual.vaga = vagaUpper;
      await AsyncStorage.setItem(`moto-${placaUpper}`, JSON.stringify(motoAtual));

      Alert.alert('Movimentação registrada com sucesso!');
      setPlaca('');
      setTipo('');
      setVaga('');
    } catch (error) {
      Alert.alert('Erro ao registrar movimentação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Tipo (entrada / saida):</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} />

      <Text style={styles.label}>Vaga:</Text>
      <TextInput style={styles.input} value={vaga} onChangeText={setVaga} />

      <TouchableOpacity style={styles.button} onPress={registrarMovimentacao}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  label: { color: Colors.text, fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: Colors.card, color: Colors.text, borderWidth: 1, borderColor: Colors.inputBorder, borderRadius: 6, padding: 10, marginBottom: 15 },
  button: { backgroundColor: Colors.primary, padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: Colors.text, fontWeight: 'bold' },
});
