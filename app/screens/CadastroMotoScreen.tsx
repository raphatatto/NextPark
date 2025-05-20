import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VAGAS_FIXAS } from '../constants/vagas';
import { Colors } from '../constants/Color';

export default function CadastroMotoScreen() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [vaga, setVaga] = useState('');
  const [vagasOcupadas, setVagasOcupadas] = useState<string[]>([]);

  useEffect(() => {
    const buscarVagasOcupadas = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const motosKeys = keys.filter((k) => k.startsWith('moto-'));
      const resultados = await AsyncStorage.multiGet(motosKeys);
      const ocupadas = resultados.map(([_, val]) => val ? JSON.parse(val).vaga.toUpperCase() : null).filter(Boolean);
      setVagasOcupadas(ocupadas);
      const vagaSugerida = VAGAS_FIXAS.find(v => !ocupadas.includes(v));
      if (vagaSugerida) setVaga(vagaSugerida);
    };
    buscarVagasOcupadas();
  }, []);

  const salvarMoto = async () => {
    if (!placa || !modelo || !vaga) return Alert.alert('Preencha todos os campos!');
    const keys = await AsyncStorage.getAllKeys();
    if (keys.includes(`moto-${placa.toUpperCase()}`)) return Alert.alert('Placa já cadastrada.');

    const motosKeys = keys.filter((k) => k.startsWith('moto-'));
    const resultados = await AsyncStorage.multiGet(motosKeys);
    const ocupadasAtual = resultados.map(([_, val]) => val ? JSON.parse(val).vaga.toUpperCase() : null).filter(Boolean);

    if (ocupadasAtual.includes(vaga.toUpperCase())) {
      Alert.alert(`A vaga ${vaga.toUpperCase()} já está ocupada.`);
      return;
    }

    const novaMoto = {
      placa: placa.toUpperCase(),
      modelo,
      vaga: vaga.toUpperCase(),
      status: 'Alocada',
      dataCadastro: new Date().toISOString(),
    };

    await AsyncStorage.setItem(`moto-${placa.toUpperCase()}`, JSON.stringify(novaMoto));
    Alert.alert(`Moto cadastrada na vaga ${vaga.toUpperCase()}`);
    setPlaca('');
    setModelo('');
    setVaga('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Modelo:</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

      <Text style={styles.label}>Vaga (sugerida ou manual):</Text>
      <TextInput style={styles.input} value={vaga} onChangeText={setVaga} />

      <TouchableOpacity style={styles.button} onPress={salvarMoto}>
        <Text style={styles.buttonText}>Salvar Moto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  label: { color: Colors.text, marginBottom: 5, fontWeight: 'bold' },
  input: { backgroundColor: Colors.card, borderColor: Colors.inputBorder, borderWidth: 1, borderRadius: 6, color: Colors.text, padding: 10, marginBottom: 15 },
  button: { backgroundColor: Colors.primary, padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: Colors.text, fontWeight: 'bold' },
});
