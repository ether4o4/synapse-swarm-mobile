import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AGENTS = [
  { id: '1', name: 'Architect', role: 'Infrastructure', status: 'Idle' },
  { id: '2', name: 'Logic Engine', role: 'Logic', status: 'Thinking' },
  { id: '3', name: 'Stylist', role: 'UI/UX', status: 'Idle' },
];

export default function AgentsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={AGENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F2F2F7' },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#8E8E93' },
  status: { fontSize: 14, color: '#34C759', marginTop: 4 },
});