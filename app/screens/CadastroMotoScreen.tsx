import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VAGAS_FIXAS } from '../constants/vagas';

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
      const ocupadas = resultados.map(([_, val]) => val ? JSON.parse(val).vaga : null).filter(Boolean);
      setVagasOcupadas(ocupadas);

      // Sugerir próxima vaga livre
      const vagaSugerida = VAGAS_FIXAS.find(v => !ocupadas.includes(v));
      if (vagaSugerida) setVaga(vagaSugerida);
    };

    buscarVagasOcupadas();
  }, []);

    const salvarMoto = async () => {
    if (!placa || !modelo || !vaga) {
        Alert.alert('Preencha todos os campos!');
        return;
    }

    try {
        // Revalida as vagas ocupadas em tempo real
        const keys = await AsyncStorage.getAllKeys();
        const motosKeys = keys.filter((k) => k.startsWith('moto-'));
        const resultados = await AsyncStorage.multiGet(motosKeys);
        const ocupadasAtual = resultados
        .map(([_, val]) => val ? JSON.parse(val).vaga : null)
        .filter(Boolean);

        if (ocupadasAtual.map(v => v.toUpperCase()).includes(vaga.toUpperCase())) {
        Alert.alert(`A vaga ${vaga} já está ocupada. Escolha outra.`);
        return;
        }

        if (keys.includes(`moto-${placa.toUpperCase()}`)) {
        Alert.alert('Essa placa já está cadastrada.');
        return;
        }


        const novaMoto = {
        placa: placa.toUpperCase(),
        modelo,
        vaga: vaga.toUpperCase(),
        status: 'Alocada',
        dataCadastro: new Date().toISOString(),
        };


        await AsyncStorage.setItem(`moto-${placa}`, JSON.stringify(novaMoto));
        Alert.alert(`Moto cadastrada com sucesso na vaga ${vaga}`);
        setPlaca('');
        setModelo('');
        setVaga('');
    } catch (error) {
        Alert.alert('Erro ao salvar a moto');
    }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Placa:</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} />

      <Text style={styles.label}>Modelo:</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

      <Text style={styles.label}>Vaga sugerida (editável):</Text>
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
