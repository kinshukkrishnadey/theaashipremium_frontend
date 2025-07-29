import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import SuperadminHomeScreen from '../screens/SuperadminHomeScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import { RootStackParamList } from '../types/NavigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
      <Stack.Screen name="SuperAdminHomeScreen" component={SuperadminHomeScreen} />
      <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
      
    </Stack.Navigator>
  );
};

export default StackNavigator;
