import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Color';
import { Picker } from '@react-native-picker/picker';

export default function MovimentacaoScreen() {
  const [placa, setPlaca] = useState('');
  const [tipo, setTipo] = useState('');
  const [vaga, setVaga] = useState('');
  const [vagaBloqueada, setVagaBloqueada] = useState(false);
  const [motoExiste, setMotoExiste] = useState(false);

  useEffect(() => {
    const verificarMoto = async () => {
      const placaUpper = placa.trim().toUpperCase();
      const motoData = await AsyncStorage.getItem(`moto-${placaUpper}`);
      setMotoExiste(!!motoData);

      if (tipo === 'saida') {
        setVagaBloqueada(true);
      } else if (tipo === 'vaga') {
        setVagaBloqueada(!placaUpper || !motoData); 
      } else {
        setVagaBloqueada(false);
      }
    };

    verificarMoto();
  }, [placa, tipo]);

  const registrarMovimentacao = async () => {
    const placaUpper = placa.trim().toUpperCase();
    const vagaUpper = vaga.trim().toUpperCase();

    if (!placaUpper || !tipo || (!vagaUpper && tipo !== 'saida')) {
      Alert.alert('Preencha todos os campos.');
      return;
    }

    try {
      const motoData = await AsyncStorage.getItem(`moto-${placaUpper}`);
      if (!motoData) {
        Alert.alert('Moto não encontrada. Cadastre primeiro.');
        return;
      }

      const movimentacao = {
        placa: placaUpper,
        tipo,
        vaga: vagaUpper,
        dataHora: new Date().toISOString(),
      };

      const historicoExistente = await AsyncStorage.getItem(`movimentacoes-${placaUpper}`);
      const historico = historicoExistente ? JSON.parse(historicoExistente) : [];
      historico.push(movimentacao);
      await AsyncStorage.setItem(`movimentacoes-${placaUpper}`, JSON.stringify(historico));

      const motoAtual = JSON.parse(motoData);

      if (tipo === 'saida' && vagaUpper !== motoAtual.vaga) {
        Alert.alert('Não é permitido alterar a vaga durante uma saída.');
        return;
      }

      if (tipo === 'entrada' || tipo === 'vaga') {
        motoAtual.vaga = vagaUpper;
      }

      if (tipo === 'saida') {
        motoAtual.status = 'Fora do pátio';
      } else if (tipo === 'entrada') {
        motoAtual.status = 'Alocada';
      }

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

      <Text style={styles.label}>Tipo de movimentação:</Text>
      <View style={styles.pickerContainer}>
      <Picker
      selectedValue={tipo}
      onValueChange={(itemValue) => setTipo(itemValue)}
      style={styles.picker}
      dropdownIconColor={Colors.text}
        >
      <Picker.Item label="Selecione o tipo" value="" color="#888" />
      <Picker.Item label="Entrada" value="entrada" />
      <Picker.Item label="Saída" value="saida" />
      <Picker.Item label="Movimentação de vaga" value="vaga" />
      </Picker>
      </View>

      <Text style={styles.label}>Vaga:</Text>
      <TextInput
        style={[
          styles.input,
          vagaBloqueada && { backgroundColor: '#333', opacity: 0.5 },
        ]}
        value={vaga}
        onChangeText={setVaga}
        editable={!vagaBloqueada}
        placeholder={vagaBloqueada ? 'Bloqueado para este tipo' : ''}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={registrarMovimentacao}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  label: { color: Colors.text, fontWeight: 'bold', marginBottom: 5 },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  pickerContainer: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 6,
    marginBottom: 15,
  },
  picker: {
    color: Colors.text,
    width: '100%',
    height: 40,
    fontSize: 16,
    backgroundColor: Colors.card,
    
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: Colors.text, fontWeight: 'bold' },
});
