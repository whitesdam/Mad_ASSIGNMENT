import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import GenerateScreen from '../GenerateScreen';
import FavoritesScreen from '../FavoritesScreen';
import ProfileScreen from '../ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home-sharp' : 'home-outline';
          else if (route.name === 'Generate') iconName = focused ? 'sparkles-sharp' : 'sparkles-outline';
          else if (route.name === 'Favorites') iconName = focused ? 'heart' : 'heart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#a4508b',
        tabBarInactiveTintColor: '#43454c',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          height: 74,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
          marginBottom: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Generate" component={GenerateScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      

    </Tab.Navigator>
  );
}
