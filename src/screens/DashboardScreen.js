import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swarm Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Active Agents</Text>
        <Text style={styles.value}>3 / 10</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Memory Usage</Text>
        <Text style={styles.value}>1.2 GB</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F2F2F7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  label: { fontSize: 14, color: '#8E8E93' },
  value: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
});