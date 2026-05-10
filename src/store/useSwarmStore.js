import { create } from 'zustand';

const useSwarmStore = create((set, get) => ({
  agents: [
    { 
      id: 'architect', 
      name: 'Architect', 
      role: 'Infrastructure', 
      status: 'idle',
      config: { model: 'deepseek-coder', temperature: 0.2 },
      memory: [],
      storage: []
    },
    { 
      id: 'logic', 
      name: 'Logic Engine', 
      role: 'Logic', 
      status: 'idle',
      config: { model: 'deepseek-chat', temperature: 0.5 },
      memory: [],
      storage: []
    },
    { 
      id: 'stylist', 
      name: 'Stylist', 
      role: 'UI/UX', 
      status: 'idle',
      config: { model: 'deepseek-chat', temperature: 0.7 },
      memory: [],
      storage: []
    },
  ],
  swarmMetrics: {
    activeAgents: 3,
    totalTasks: 0,
    memoryUsage: '1.2 GB',
    uptime: '00:00:00'
  },

  spawnAgent: (name, role, model = 'deepseek-chat') => set((state) => ({
    agents: [...state.agents, {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      role,
      status: 'idle',
      config: { model, temperature: 0.5 },
      memory: [],
      storage: []
    }],
    swarmMetrics: { ...state.swarmMetrics, activeAgents: state.agents.length + 1 }
  })),

  updateAgentConfig: (agentId, config) => set((state) => ({
    agents: state.agents.map(a => a.id === agentId ? { ...a, config: { ...a.config, ...config } } : a)
  })),

  addAgentMemory: (agentId, entry) => set((state) => ({
    agents: state.agents.map(a => a.id === agentId ? { ...a, memory: [...a.memory, entry] } : a)
  })),

  clearAgentMemory: (agentId) => set((state) => ({
    agents: state.agents.map(a => a.id === agentId ? { ...a, memory: [] } : a)
  })),

  setSwarmMetrics: (metrics) => set((state) => ({
    swarmMetrics: { ...state.swarmMetrics, ...metrics }
  }))
}));

export default useSwarmStore;
