import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import useChatStore from '../store/useChatStore';

export default function ChatScreen() {
  const { messages, processMessage, agents } = useChatStore();
  const [input, setInput] = useState('');
  const flatListRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;
    processMessage(input);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.message, styles[item.type]]}>
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        {item.type === 'agent' && (
          <View style={[styles.statusDot, { backgroundColor: agents.find(a => a.name === item.sender)?.status === 'thinking' ? '#FF9500' : '#34C759' }]} />
        )}
      </View>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <View style={styles.agentBar}>
        {agents.map(agent => (
          <View key={agent.id} style={styles.agentBadge}>
            <Text style={styles.agentBadgeText}>{agent.name[0]}</Text>
            {agent.status === 'thinking' && <View style={styles.thinkingIndicator} />}
          </View>
        ))}
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Message the swarm..."
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Send color="white" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  agentBar: { flexDirection: 'row', padding: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#C6C6C8' },
  agentBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E5E5EA', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  agentBadgeText: { fontWeight: 'bold', color: '#8E8E93' },
  thinkingIndicator: { position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF9500', borderWidth: 2, borderColor: '#FFF' },
  list: { padding: 16 },
  message: { padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: '85%' },
  messageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  user: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  agent: { alignSelf: 'flex-start', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E5EA' },
  system: { alignSelf: 'center', backgroundColor: 'transparent' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginLeft: 6 },
  sender: { fontSize: 12, fontWeight: 'bold', color: '#8E8E93' },
  text: { fontSize: 16, color: '#000' },
  inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#C6C6C8', alignItems: 'center' },
  input: { flex: 1, height: 40, backgroundColor: '#F2F2F7', borderRadius: 20, paddingHorizontal: 16, marginRight: 12, color: '#000' },
  sendButton: { width: 40, height: 40, backgroundColor: '#007AFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});