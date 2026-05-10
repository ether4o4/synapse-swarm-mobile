import useSwarmStore from '../store/useSwarmStore';
import useChatStore from '../store/useChatStore';

class AgentService {
  async executeTask(agentId, task) {
    const swarmStore = useSwarmStore.getState();
    const chatStore = useChatStore.getState();
    const agent = swarmStore.agents.find(a => a.id === agentId);

    if (!agent) return;

    // 1. Update status to 'running'
    chatStore.updateAgentStatus(agent.name, 'thinking');
    
    // 2. Simulate processing (DeepSeek integration point)
    console.log(`[${agent.name}] Executing task: ${task}`);
    
    // In a real implementation, this would call a local or remote DeepSeek model
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = `Task completed by ${agent.name}: ${task.substring(0, 20)}... Success.`;
        
        // 3. Update memory
        swarmStore.addAgentMemory(agentId, { task, result, timestamp: Date.now() });
        
        // 4. Post result to chat
        chatStore.addMessage({
          text: result,
          sender: agent.name,
          type: 'agent'
        });

        // 5. Reset status
        chatStore.updateAgentStatus(agent.name, 'idle');
        
        resolve(result);
      }, 3000);
    });
  }

  async broadcastTask(task) {
    const swarmStore = useSwarmStore.getState();
    const promises = swarmStore.agents.map(agent => this.executeTask(agent.id, task));
    return Promise.all(promises);
  }
}

export default new AgentService();
