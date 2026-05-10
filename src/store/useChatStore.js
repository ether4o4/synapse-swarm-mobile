import { create } from 'zustand';

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

  processMessage: (text) => {
    const { addMessage, updateAgentStatus, agents } = get();
    
    // Add user message
    addMessage({ text, sender: 'You', type: 'user' });

    // Basic @mention parsing
    const mentions = text.match(/@(\w+)/g) || [];
    const isSwarmBroadcast = text.toLowerCase().includes('@swarm');

    if (isSwarmBroadcast) {
      agents.forEach(agent => {
        setTimeout(() => {
          updateAgentStatus(agent.name, 'thinking');
          setTimeout(() => {
            addMessage({
              text: `${agent.name}: Acknowledged broadcast. Processing...`,
              sender: agent.name,
              type: 'agent',
            });
            updateAgentStatus(agent.name, 'idle');
          }, 1500 + Math.random() * 2000);
        }, Math.random() * 1000);
      });
    } else {
      mentions.forEach(mention => {
        const agentName = mention.substring(1);
        const agent = agents.find(a => a.name.toLowerCase() === agentName.toLowerCase());
        
        if (agent) {
          updateAgentStatus(agent.name, 'thinking');
          setTimeout(() => {
            addMessage({
              text: `${agent.name}: I hear you, Capo. Working on it.`,
              sender: agent.name,
              type: 'agent',
            });
            updateAgentStatus(agent.name, 'idle');
          }, 2000);
        }
      });
    }
  }
}));

export default useChatStore;