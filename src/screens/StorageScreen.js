import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StorageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage Explorer</Text>
      <Text style={styles.empty}>No files yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  empty: { color: '#8E8E93' },
});