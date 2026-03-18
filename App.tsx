import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserCard from './src/components/UserCard';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Yazilimci Kimlik Kartlari</Text>
      <UserCard name="Ahmet Eren AKINER" title="Senior Developer" level="Expert" />
      <UserCard name="Samet Karahan" title="Developer" level="Junior" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
});

