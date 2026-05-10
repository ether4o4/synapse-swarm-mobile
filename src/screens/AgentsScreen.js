import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { UserPlus, Settings, Trash2 } from 'lucide-react-native';
import useSwarmStore from '../store/useSwarmStore';

export default function AgentsScreen() {
  const { agents, spawnAgent } = useSwarmStore();

  const handleCreateAgent = () => {
    const names = ['Researcher', 'Analyst', 'Coder', 'Reviewer', 'Optimizer'];
    const name = names[Math.floor(Math.random() * names.length)];
    spawnAgent(name, 'Specialist');
  };

  const renderAgent = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'idle' ? '#34C759' : '#FF9500' }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.configRow}>
        <Text style={styles.configLabel}>Model:</Text>
        <Text style={styles.configValue}>{item.config.model}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Settings size={18} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Trash2 size={18} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Swarm Cluster</Text>
        <TouchableOpacity onPress={handleCreateAgent} style={styles.addButton}>
          <UserPlus size={20} color="white" />
          <Text style={styles.addButtonText}>Spawn</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={agents}
        keyExtractor={(item) => item.id}
        renderItem={renderAgent}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#C6C6C8' },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: { flexDirection: 'row', backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  list: { padding: 16 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  name: { fontSize: 18, fontWeight: 'bold' },
  role: { fontSize: 14, color: '#8E8E93' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  configRow: { flexDirection: 'row', marginBottom: 12 },
  configLabel: { fontSize: 12, color: '#8E8E93', marginRight: 8 },
  configValue: { fontSize: 12, fontWeight: '500' },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#F2F2F7', paddingTop: 12 },
  iconButton: { marginLeft: 16 },
});
