import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen'
import ContactsScreen from './src/components/ContactScreen'
import ChatScreen from './src/components/ChatScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'CodexChat - Вход'}}
        />
        <Stack.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{title: 'Контакты'}}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{title: 'Чат'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}