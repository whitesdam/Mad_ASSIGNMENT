import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen';
import ForgotPasswordScreen from '../ForgotPassword';
import SignUpScreen from '../SignUpScreen';
import NicknameScreen from '../NicknameScreen';
import WelcomeScreen from '../WelcomeScreen';
import OutfitGeneratorScreen from '../OutfitGeneratorScreen';



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ title: 'Forgot Password' }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
  name="NicknameScreen"
  component={NicknameScreen}
/>
<Stack.Screen
  name="WelcomeScreen"
  component={WelcomeScreen}
/>
<Stack.Screen
  name="OutfitGenerator"
  component={OutfitGeneratorScreen}
  options={{ headerShown: false }}
/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
