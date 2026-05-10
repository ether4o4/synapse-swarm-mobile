import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Shield, Key, Cpu, Bell, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [localMode, setLocalMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const SettingItem = ({ icon: Icon, title, subtitle, children }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingHeader}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#007AFF" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingAction}>
        {children}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>AI CONFIGURATION</Text>
        <SettingItem 
          icon={Key} 
          title="DeepSeek API Key" 
          subtitle="Required for cloud-routed agents"
        >
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="sk-..."
            secureTextEntry
          />
        </SettingItem>

        <SettingItem 
          icon={Cpu} 
          title="On-Device Mode" 
          subtitle="Run 5-10 parallel agents locally"
        >
          <Switch 
            value={localMode} 
            onValueChange={setLocalMode} 
            trackColor={{ false: "#D1D1D6", true: "#34C759" }}
          />
        </SettingItem>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <SettingItem 
          icon={Bell} 
          title="Notifications" 
          subtitle="Alert on task completions"
        >
          <Switch 
            value={notifications} 
            onValueChange={setNotifications} 
            trackColor={{ false: "#D1D1D6", true: "#34C759" }}
          />
        </SettingItem>

        <SettingItem 
          icon={Shield} 
          title="Privacy & Security" 
          subtitle="Isolated agent memory management"
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>
        </SettingItem>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ABOUT</Text>
        <SettingItem icon={Info} title="Version">
          <Text style={styles.versionText}>1.0.0 (Alpha)</Text>
        </SettingItem>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Configuration</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7', padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#1C1C1E' },
  section: { marginBottom: 32 },
  sectionLabel: { fontSize: 13, color: '#8E8E93', marginBottom: 8, marginLeft: 4, fontWeight: '600' },
  settingRow: { 
    backgroundColor: '#FFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  settingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconContainer: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#F2F2F7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  textContainer: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
  settingSubtitle: { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  settingAction: { marginTop: 4 },
  input: { backgroundColor: '#F2F2F7', padding: 10, borderRadius: 8, fontSize: 14, color: '#1C1C1E' },
  button: { backgroundColor: '#F2F2F7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  buttonText: { fontSize: 14, color: '#007AFF', fontWeight: '500' },
  versionText: { fontSize: 14, color: '#8E8E93' },
  saveButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8, marginBottom: 40 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
