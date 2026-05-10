import useSwarmStore from '../store/useSwarmStore';
import useChatStore from '../store/useChatStore';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

class AgentService {
  async executeTask(agentId, task) {
    const swarmStore = useSwarmStore.getState();
    const chatStore = useChatStore.getState();
    const agent = swarmStore.agents.find(a => a.id === agentId);

    if (!agent) return;

    // 1. Update status to 'thinking'
    chatStore.updateAgentStatus(agent.name, 'thinking');
    
    try {
      // 2. DeepSeek API Call
      // Note: In a real Expo app, use EXPO_PUBLIC_ prefix for env vars
      const apiKey = process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY;
      
      if (!apiKey) {
        throw new Error('DeepSeek API Key not configured. Please add EXPO_PUBLIC_DEEPSEEK_API_KEY to your environment.');
      }

      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: agent.config.model || 'deepseek-chat',
          messages: [
            { role: 'system', content: `You are ${agent.name}, a specialized AI agent with the role: ${agent.role}. Your personality is ${agent.config.personality || 'professional and helpful'}.` },
            ...agent.memory.map(m => ({ role: 'user', content: m.task })), // Simple memory injection
            { role: 'user', content: task }
          ],
          temperature: agent.config.temperature || 0.5,
        })
      });

      const data = await response.json();
      const result = data.choices[0].message.content;
      
      // 3. Update memory
      swarmStore.addAgentMemory(agentId, { task, result, timestamp: Date.now() });
      
      // 4. Post result to chat
      chatStore.addMessage({
        text: result,
        sender: agent.name,
        type: 'agent'
      });

    } catch (error) {
      console.error(`[${agent.name}] Error:`, error);
      chatStore.addMessage({
        text: `Error executing task: ${error.message}`,
        sender: 'System',
        type: 'system'
      });
    } finally {
      // 5. Reset status
      chatStore.updateAgentStatus(agent.name, 'idle');
    }
  }

  async broadcastTask(task) {
    const swarmStore = useSwarmStore.getState();
    const promises = swarmStore.agents.map(agent => this.executeTask(agent.id, task));
    return Promise.all(promises);
  }
}

export default new AgentService();
