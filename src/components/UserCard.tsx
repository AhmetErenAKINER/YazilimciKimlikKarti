import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function UserCard({ name, title, level }: { name: string, title: string, level: string }) {
  
  const [musaitMi, setMusaitMi] = useState(true);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text>Seviye: {level}</Text>
      
      <View style={{ marginTop: 10 }}>
        <Button 
          title={musaitMi ? "İşe Al" : "Projelerde Çalışıyor"} 
          onPress={() => setMusaitMi(false)} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title:{
        fontSize: 14,
        color: 'gray',
    }
})