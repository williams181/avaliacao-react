import { SafeAreaView, StatusBar } from 'react-native';
import Routes from './src/routes';
import React from 'react';

function App() {
  return (
    <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
      <StatusBar backgroundColor="#000" />
      <Routes />
    </SafeAreaView>
  );
}

export default App;