import React from 'react';
import { View } from 'react-native';
import LoginScreen from '../app/LoginScreen'; 
import HomePage from '../app/HomePage';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/*<LoginScreen />*/}
      <HomePage />
    </View>
    
  );
}
