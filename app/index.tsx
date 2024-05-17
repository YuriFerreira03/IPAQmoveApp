import React from 'react';
import { View } from 'react-native';
import LoginScreen from '../app/LoginScreen';  // Certifique-se de que o caminho está correto

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen />
    </View>
  );
}
