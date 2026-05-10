import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Activity, Cpu, HardDrive, Zap } from 'lucide-react-native';
import useSwarmStore from '../store/useSwarmStore';

export default function DashboardScreen() {
  const { swarmMetrics } = useSwarmStore();

  const MetricCard = ({ title, value, icon: Icon, color }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon color={color} size={20} />
        <Text style={styles.label}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>System Health</Text>
      
      <View style={styles.grid}>
        <MetricCard 
          title="Active Agents" 
          value={swarmMetrics.activeAgents} 
          icon={Users} 
          color="#007AFF" 
        />
        <MetricCard 
          title="Tasks Executed" 
          value={swarmMetrics.totalTasks} 
          icon={Zap} 
          color="#FF9500" 
        />
        <MetricCard 
          title="Memory Usage" 
          value={swarmMetrics.memoryUsage} 
          icon={Cpu} 
          color="#5856D6" 
        />
        <MetricCard 
          title="Uptime" 
          value={swarmMetrics.uptime} 
          icon={Activity} 
          color="#34C759" 
        />
      </View>

      <Text style={styles.sectionTitle}>Swarm Activity</Text>
      <View style={styles.activityCard}>
        <Text style={styles.emptyText}>No recent swarm events.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16, 
    width: '48%',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 12, color: '#8E8E93', marginLeft: 8 },
  value: { fontSize: 20, fontWeight: 'bold' },
  activityCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center' },
  emptyText: { color: '#8E8E93', fontSize: 14 },
});
