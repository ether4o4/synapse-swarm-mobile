import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to Synapse Swarm, Capo.', sender: 'System', type: 'system' },
    { id: '2', text: 'Architect: Swarm initialized and ready.', sender: 'Architect', type: 'agent' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: input, sender: 'You', type: 'user' }]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, styles[item.type]]}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Message the swarm..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Send color="white" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  list: { padding: 16 },
  message: { padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: '80%' },
  user: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  agent: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA' },
  system: { alignSelf: 'center', backgroundColor: 'transparent' },
  sender: { fontSize: 12, fontWeight: 'bold', marginBottom: 4, color: '#8E8E93' },
  text: { fontSize: 16, color: '#000' },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#C6C6C8' },
  input: { flex: 1, height: 40, backgroundColor: '#F2F2F7', borderRadius: 20, paddingHorizontal: 16, marginRight: 12 },
  sendButton: { width: 40, height: 40, backgroundColor: '#007AFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});