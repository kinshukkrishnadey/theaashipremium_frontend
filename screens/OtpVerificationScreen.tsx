import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationTypes';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AuthService from '../services/AuthService';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

const OtpVerificationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const user = await AuthService.verifyOtp(phoneNumber, otp);
      Alert.alert('Success', `Welcome ${user.role}!`);
      // TODO: navigate to homepage/dashboard
      if (user.role === 'ADMIN' || user.role === 'SUPERADMIN') {
      navigation.replace('SuperAdminHomeScreen'); // replace to prevent back nav
    } else if (user.role === 'USER') {
      navigation.replace('UserHomeScreen');
    } else {
      Alert.alert('Error', 'Unknown user role');
    }
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />
      <Button title="Verify OTP" onPress={handleVerifyOtp} />
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    height: 50, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 20,
  },
});
