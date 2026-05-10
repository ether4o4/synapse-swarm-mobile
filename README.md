# Synapse Swarm Mobile

A mobile-first multi-agent orchestration platform.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` (or `.env.local` for Expo)
   - Add your `EXPO_PUBLIC_DEEPSEEK_API_KEY`

3. Start the app:
   ```bash
   npx expo start
   ```

## Features
- **Group Chat**: Interact with multiple agents in one room.
- **Swarm Dashboard**: Monitor system health and task metrics.
- **Agent Management**: Spawn and configure specialized agents.
- **Isolated Storage**: Each agent has its own secure vault.
