import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageSquare, LayoutDashboard, Users, HardDrive } from 'lucide-react-native';

import ChatScreen from '../screens/ChatScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AgentsScreen from '../screens/AgentsScreen';
import StorageScreen from '../screens/StorageScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Chat') return <MessageSquare color={color} size={size} />;
          if (route.name === 'Dashboard') return <LayoutDashboard color={color} size={size} />;
          if (route.name === 'Agents') return <Users color={color} size={size} />;
          if (route.name === 'Storage') return <HardDrive color={color} size={size} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Swarm Chat' }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Agents" component={AgentsScreen} />
      <Tab.Screen name="Storage" component={StorageScreen} />
    </Tab.Navigator>
  );
}