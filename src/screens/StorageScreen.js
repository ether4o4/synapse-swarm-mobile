import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Folder, FileText, ChevronRight } from 'lucide-react-native';
import useSwarmStore from '../store/useSwarmStore';

export default function StorageScreen() {
  const { agents } = useSwarmStore();

  const renderStorageItem = ({ item }) => (
    <TouchableOpacity style={styles.agentRow}>
      <View style={styles.iconContainer}>
        <Folder color="#007AFF" size={24} />
      </View>
      <View style={styles.info}>
        <Text style={styles.agentName}>{item.name}'s Vault</Text>
        <Text style={styles.details}>{item.storage.length} files · Isolated</Text>
      </View>
      <ChevronRight color="#C6C6C8" size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Swarm Storage</Text>
        <Text style={styles.subtitle}>Isolated environments for each agent</Text>
      </View>

      <FlatList
        data={agents}
        keyExtractor={(item) => item.id}
        renderItem={renderStorageItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No agent environments found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#C6C6C8' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#8E8E93', marginTop: 4 },
  list: { padding: 16 },
  agentRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 2, 
    elevation: 2
  },
  iconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F2F2F7', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  info: { flex: 1 },
  agentName: { fontSize: 16, fontWeight: '600' },
  details: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 40, color: '#8E8E93' },
});
