import { create } from 'zustand';
import AgentService from '../services/AgentService';

const useChatStore = create((set, get) => ({
  messages: [
    { id: '1', text: 'Welcome to Synapse Swarm, Capo.', sender: 'System', type: 'system', timestamp: Date.now() },
    { id: '2', text: 'Architect: Swarm initialized and ready.', sender: 'Architect', type: 'agent', status: 'idle', timestamp: Date.now() },
  ],
  agents: [
    { id: 'architect', name: 'Architect', role: 'Infrastructure', status: 'idle' },
    { id: 'logic', name: 'Logic Engine', role: 'Logic', status: 'idle' },
    { id: 'stylist', name: 'Stylist', role: 'UI/UX', status: 'idle' },
  ],
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, { ...message, id: Date.now().toString(), timestamp: Date.now() }]
  })),

  updateAgentStatus: (agentName, status) => set((state) => ({
    agents: state.agents.map(a => a.name === agentName ? { ...a, status } : a)
  })),

  processMessage: async (text) => {
    const { addMessage, agents } = get();
    
    // 1. Add user message
    addMessage({ text, sender: 'You', type: 'user' });

    // 2. Parse mentions
    const mentions = text.match(/@(\w+)/g) || [];
    const isSwarmBroadcast = text.toLowerCase().includes('@swarm');

    if (isSwarmBroadcast) {
      addMessage({ text: 'Broadcasting task to the entire swarm...', sender: 'System', type: 'system' });
      AgentService.broadcastTask(text.replace('@swarm', '').trim());
    } else if (mentions.length > 0) {
      mentions.forEach(mention => {
        const agentName = mention.substring(1);
        const agent = agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
        
        if (agent) {
          AgentService.executeTask(agent.id, text.replace(mention, '').trim());
        } else {
          addMessage({ text: `Agent "${agentName}" not found in the cluster.`, sender: 'System', type: 'system' });
        }
      });
    } else {
      // Default behavior: Architect acknowledges
      AgentService.executeTask('architect', text);
    }
  }
}));

export default useChatStore;
