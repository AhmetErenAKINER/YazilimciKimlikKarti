import React from 'react'; 
import { StyleSheet, View } from 'react-native';
import UserCard from './src/components/UserCard'; 

export default function App() {
  return (
    <View style={styles.container}>
      {/* İstenen 3 prop da gönderiliyor: name, title, level */}
      <UserCard name="Ahmet Eren AKINER" title="Senior Developer" level="Expert" />
      <UserCard name="Samet Karahan" title="Developer" level="Junior" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

