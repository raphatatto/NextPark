import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroMotoScreen() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [vaga, setVaga] = useState('');

  const salvarMoto = async () => {
    if (!placa || !modelo || !vaga) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    const novaMoto = {
      placa,
      modelo,
      vaga,
      status: 'Alocada',
      dataCadastro: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem(`moto-${placa}`, JSON.stringify(novaMoto));
      Alert.alert('Moto cadastrada com sucesso!');
      setPlaca('');
      setModelo('');
      setVaga('');
    }  catch (error: any) {
        Alert.alert('Erro ao salvar as motos', error.message || String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Modelo:</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

      <Text style={styles.label}>Vaga:</Text>
      <TextInput style={styles.input} value={vaga} onChangeText={setVaga} />

      <Button title="Salvar Moto" onPress={salvarMoto} />
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
