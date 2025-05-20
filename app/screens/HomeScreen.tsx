import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Color';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [totalMotos, setTotalMotos] = useState(0);
  const [vagasOcupadas, setVagasOcupadas] = useState(0);

  useEffect(() => {
    const carregarDados = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const motosKeys = keys.filter((k) => k.startsWith('moto-'));
      const dados = await AsyncStorage.multiGet(motosKeys);
      const ocupadas = dados.map(([_, v]) => v ? JSON.parse(v).vaga : null).filter(Boolean);
      setTotalMotos(motosKeys.length);
      setVagasOcupadas(new Set(ocupadas).size);
    };

    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
    <Image source={require('../../assets/images/3.png')} style={styles.logo} />
    <Text style={styles.title}>Gestão de Motos – Mottu</Text>
  
    <View style={styles.card}>
      <Text style={styles.item}>
        <Ionicons name="bicycle" size={18} color="#00C853" style={styles.icon} />
        Motos cadastradas: <Text style={styles.number}>{totalMotos}</Text>
      </Text>
  
      <Text style={styles.item}>
        <Ionicons name="car-outline" size={18} color="#00C853" style={styles.icon} />
        Vagas ocupadas: <Text style={styles.number}>{vagasOcupadas}</Text>
      </Text>
    </View>
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 30 },
  card: { backgroundColor: Colors.card, borderRadius: 10, padding: 20, width: '100%', gap: 10 },
  item: { color: Colors.text, fontSize: 16 },
  number: { color: Colors.primary, fontWeight: 'bold' },
  icon: {marginRight: 6,},
});
