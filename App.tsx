import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TabNavigator from './app/TabNavigator';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <TabNavigator />
    </SafeAreaView>
  );
}
