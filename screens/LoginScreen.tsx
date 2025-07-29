import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AuthService from '../services/AuthService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOtp = async () => {
    try {
      console.log("Send OTP button clicked")
      const response=await AuthService.sendOtp(phoneNumber);
     console.log("OTP sent response:", response.data);
      navigation.navigate('OtpVerification', { phoneNumber });
      console.log("button clicked")
    } catch (error:any) {
      console.log("Error sending OTP:", error?.message);
      if (error?.response) {
      console.log("Response error data:", error.response.data);
    } else if (error?.request) {
      console.log("No response received. Request:", error.request);
    }
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="+91XXXXXXXXXX"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send OTP" onPress={() => {
  console.log("Send OTP button clicked");
  handleSendOtp();}}/>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    height: 50, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 20,
  },
});
