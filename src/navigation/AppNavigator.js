import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MessageSquare, LayoutDashboard, Users, HardDrive, Settings } from 'lucide-react-native';

import ChatScreen from '../screens/ChatScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AgentsScreen from '../screens/AgentsScreen';
import StorageScreen from '../screens/StorageScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Chat') return <MessageSquare color={color} size={size} />;
          if (route.name === 'Dashboard') return <LayoutDashboard color={color} size={size} />;
          if (route.name === 'Agents') return <Users color={color} size={size} />;
          if (route.name === 'Storage') return <HardDrive color={color} size={size} />;
          if (route.name === 'Settings') return <Settings color={color} size={size} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#C6C6C8',
          backgroundColor: '#FFF',
          paddingBottom: 5,
          height: 60,
        }
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Agents" component={AgentsScreen} />
      <Tab.Screen name="Storage" component={StorageScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
